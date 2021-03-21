import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from 'services/api';
import { useAuth } from 'contexts/auth';

import Modal from 'react-modal';
const ModalStyles = {
  content: {
    position: 'absolute',
    top: '7vh',
    left: '35vw',
    right: '35vw',
    bottom: '7vh',
    backgroundColor: '#f6f6f6',
    zIndex: '5'
  }
};

import {
  CampaignContainer,
  CampaignImage,
  CampaignNoImage,
  CampaignTitle,
  OngImage,
  OngNoImage,
  ContentSection,
  OngSection,
  OngData,
  ProgressBar,
  FormContainer,
  InputContainer
} from './styles';

import Button from 'components/Button';
import Input from 'components/Input';

const Campaign = ({ campaign }) => {
  const [ong, setOng] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalCampanha, setmodalCampanha] = useState(false);
  const [datDoacao, setDatDoacao] = useState(null);
  const [vlrDoacao, setVlrDoacao] = useState('');
  const [doador, setDoador] = useState('');
  const [loadedAuth, setLoadedAuth] = useState(false);
  const { signed, user } = useAuth();

  useEffect(() => {
    if (loadedAuth) {
      if (signed) {
        setDatDoacao(
          new Date().getFullYear() +
            '-' +
            new Date().getMonth() +
            '-' +
            new Date().getDate()
        );
        setDoador(user.id);
      }
    }
  }, [loadedAuth]);

  useEffect(() => {
    if (signed != null) {
      setLoadedAuth(true);
    }
  }, [signed]);

  useEffect(async () => {
    const ongFetch = await api.get(`/ongs/${campaign.id_ong}`);

    setOng(ongFetch.data[0]);
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function OpenModal() {
    setIsOpen(true);
  }

  const OpenCampanha = () => {
    setmodalCampanha(true);
  };

  const CloseCampanha = () => {
    setmodalCampanha(false);
  };

  function handleChange(ev) {
    if (ev.target.name == 'valor') {
      setVlrDoacao(parseInt(ev.target.value));

      console.log(vlrDoacao);
    }
  }

  async function doar() {
    let data = {
      id_ong: campaign.id_ong,
      seq_campanha: campaign.seq_campanha,
      Dat_doacao: datDoacao,
      vlr_doacao: vlrDoacao,
      id_doador: doador
    };

    try {
      const response = await api.post(`/doacaoCampanha`, data);

      console.log(response);
    } catch (err) {
      console.warn(`Não foi possível atualizar as informações da Ong. ${err}`);
    }
  }

  return (
    <CampaignContainer>
      {!!campaign.fotos[0] ? (
        <CampaignImage src={campaign.fotos[0]} onClick={() => OpenCampanha()} />
      ) : (
        <CampaignNoImage onClick={() => OpenCampanha()} />
      )}
      <ContentSection>
        <CampaignTitle>{campaign.des_titulo}</CampaignTitle>
        <Link href={ong ? `/ong/${ong.id_ong}` : ''}>
          <OngSection>
            {ong?.profile_pic ? (
              <OngImage src={ong.profile_pic} />
            ) : (
              <OngNoImage />
            )}
            {ong && (
              <OngData>
                <p>{ong.nom_ONG}</p>
                <span>{`${ong.des_endereco}`}</span>
              </OngData>
            )}
          </OngSection>
        </Link>
        <p
          className="valueLabel"
          style={{ color: '#2f2e41', fontWeight: 'bold', paddingBottom: 5 }}
        >{`${campaign.vlr_arrecadado} / ${campaign.vlr_objetivo}`}</p>
        <ProgressBar
          goal={parseFloat(
            campaign.vlr_objetivo.split(' ')[1].replace('.', '')
          )}
          current={parseFloat(
            campaign.vlr_arrecadado.split(' ')[1].replace('.', '')
          )}
        />
      </ContentSection>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={ModalStyles}
      />

      <Modal
        isOpen={modalCampanha}
        onRequestClose={CloseCampanha}
        style={ModalStyles}
      >
        <CampaignTitle>{campaign.des_titulo}</CampaignTitle>
        <h2>{campaign.des_geral}</h2>
        <FormContainer>
          <p
            className="valueLabel"
            style={{ color: '#2f2e41', fontWeight: 'bold', paddingBottom: 5 }}
          >{`${campaign.vlr_arrecadado} / ${campaign.vlr_objetivo}`}</p>
          <ProgressBar
            goal={parseFloat(
              campaign.vlr_objetivo.split(' ')[1].replace('.', '')
            )}
            current={parseFloat(
              campaign.vlr_arrecadado.split(' ')[1].replace('.', '')
            )}
          />
        </FormContainer>
        <form>
          <Input name="agencia" label="Agência*" type="text" width="17vw" />
          <InputContainer>
            <Input name="conta" label="Conta*" type="text" width="17vw" />
          </InputContainer>
          <Input
            name="valor"
            label="Valor a doar*"
            type="numeric"
            width="17vw"
            onChange={handleChange}
          />
          <InputContainer>
            <Input
              name="forma_pagamento"
              label="Forma de Pagamento*"
              type="text"
              width="17vw"
              onChange={handleChange}
            />
          </InputContainer>
          <FormContainer>
            <Button
              width="50%"
              height="6vh"
              fontSize="1.8em"
              onClick={() => doar()}
            >
              Doar
            </Button>
          </FormContainer>
        </form>
      </Modal>
    </CampaignContainer>
  );
};

export default Campaign;
