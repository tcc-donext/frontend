import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from 'services/api';
import { useAuth } from 'contexts/auth';
import { useRouter } from 'next/router';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Modal from 'react-modal';
const ModalStyles = {
  content: {
    position: 'absolute',
    top: '6vh',
    left: '35.9vw',
    right: '35.9vw',
    bottom: '6vh',
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
import { Router } from 'next/router';

const Campaign = ({ campaign }) => {
  const [ong, setOng] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalCampanha, setmodalCampanha] = useState(false);
  const [datDoacao, setDatDoacao] = useState(null);
  const [vlrDoacao, setVlrDoacao] = useState('');
  const [doador, setDoador] = useState('');
  const [loadedAuth, setLoadedAuth] = useState(false);
  const { signed, user } = useAuth();
  const router = useRouter();

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
      setVlrDoacao(ev.target.value);
    }
  }

  const doar = async e => {
    e.preventDefault();
    let data = {
      id_ong: campaign.id_ong,
      seq_campanha: campaign.seq_campanha,
      Dat_doacao: datDoacao,
      vlr_doacao: vlrDoacao,
      id_doador: doador
    };

    let objetivo = parseFloat(campaign.vlr_objetivo.split(' ')[1]);
    let arrecadado = parseFloat(campaign.vlr_arrecadado.split(' ')[1]);

    if (vlrDoacao <= 0) {
      toast.error('O valor a doar está incorreto! 🤷‍♂️');
    } else if (objetivo <= arrecadado) {
      toast.warn('A meta dessa campanha já foi alcançada! 😁');
    } else if (new Date() > new Date(campaign.dat_fim)) {
      toast.warn('Essa campanha já expirou! 🤞');
    } else {
      try {
        const response = await api.post(`/doacaoCampanha`, data);

        console.log(response);
        router.reload();
      } catch (err) {
        console.warn(
          `Não foi possível atualizar as informações da Ong. ${err}`
        );
      }
    }
  };

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
            {ong?.link_foto_perfil ? (
              <OngImage src={ong.link_foto_perfil} />
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
        <p>
          Fim:{' '}
          {new Date(campaign.dat_fim).getDate() +
            '/' +
            (new Date(campaign.dat_fim).getMonth() + 1) +
            '/' +
            new Date(campaign.dat_fim).getFullYear()}
        </p>
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
          <Input
            name="formaPagamento"
            label="Forma de pagamento"
            type="text"
            width="15vw"
            placeholder="CARTÃO"
            disabled="disabled"
            style={{ float: 'left' }}
          />
          <Input
            name="pais"
            label="País"
            type="text"
            width="6vw"
            placeholder="BRASIL"
            disabled="disabled"
            style={{ marginBottom: '2vh', marginLeft: '66%' }}
          />
          <Input
            name="nroCartao"
            label="Número do cartão*"
            type="text"
            width="23vw"
            style={{ marginBottom: '2vh' }}
          />
          <Input
            name="cvv"
            label="CVV*"
            type="text"
            width="7vw"
            style={{ float: 'left' }}
          />
          <Input
            name="dataVencimento"
            label="Data de vencimento*"
            type="date"
            width="14vw"
            style={{ marginBottom: '2vh', marginLeft: '9vw' }}
          />
          <Input
            name="valor"
            label="Valor a doar*"
            type="numeric"
            width="17vw"
            onChange={handleChange}
            style={{ marginBottom: '2vh' }}
          />
          <FormContainer>
            <Button width="50%" height="6vh" fontSize="1.8em" onClick={doar}>
              Doar
            </Button>
          </FormContainer>
        </form>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={2200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </CampaignContainer>
  );
};

export default Campaign;
