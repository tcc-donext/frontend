import { useState, useEffect } from 'react';
import FormPageLayout from 'components/layouts/FormPageLayout';

import {
  Container,
  OngSection,
  OngImageContainer,
  OngInfoContainer,
  CampaignSubtitle,
  CampaignContainer,
  Table,
  Campaign,
  InputContainer,
  FormContainer
} from 'styles/pages/ong';
import Button from 'components/Button';
import Input from 'components/Input';
import { useRouter } from 'next/router';
import api from 'services/api';

import Modal from 'react-modal';

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const ModalStyles = {
  content: {
    position: 'absolute',
    top: '20vh',
    left: '35.9vw',
    right: '35.9vw',
    bottom: '20vh',
    backgroundColor: '#f6f6f6',
    zIndex: '5'
  }
};

const ongPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [modalOpen, setModalOpen] = useState(false);
  const [vlrDoacao, setVlrDoacao] = useState(0);
  const [ong, setOng] = useState();
  const [ongCampaigns, setOngCampaigns] = useState();

  useEffect(async () => {
    if (!pid) return;
    const ongFetch = (await api.get(`/ongs/${pid}`)).data[0];

    if (!ongFetch) router.push('/home');

    setOng(ongFetch);
  }, [pid]);

  useEffect(async () => {
    if (!ong) return;
    const campFetch = (await api.get(`/profile/${ong.id_ong}`)).data;

    setOngCampaigns(campFetch);
  }, [ong]);

  const doar = async evt => {
    evt.preventDefault();
    setModalOpen(false);

    try {
      await api.post('/doacaoDireta', {
        id_ong: pid,
        dat_doacao: new Date(),
        vlr_doacao: vlrDoacao
      });
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Container>
      {ong && ongCampaigns && (
        <>
          <OngSection>
            <OngImageContainer>
              <img src={ong.link_foto_perfil} />
              <h1>{ong.nom_ONG}</h1>
            </OngImageContainer>
            <OngInfoContainer>
              <Input
                label="Endereço"
                labelProps={{ fontSize: '1.8em' }}
                value={`${ong.des_endereco} - CEP: ${ong.nro_cep}`}
                width="30vw"
                fontSize="1.5em"
                disabled
              />
              <Input
                label="Email"
                labelProps={{ fontSize: '1.8em' }}
                value={ong.contato.des_email}
                width="30vw"
                fontSize="1.5em"
                disabled
              />
            </OngInfoContainer>
          </OngSection>
          <CampaignSubtitle>
            Campanhas ativas! <span>({ongCampaigns.length}/10)</span>
          </CampaignSubtitle>
          <CampaignContainer>
            <Table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Arrecadação</th>
                  <th>Data de expiração</th>
                </tr>
              </thead>
              <tbody>
                <OverlayScrollbarsComponent style={{ maxHeight: '22vh' }}>
                  {ongCampaigns.map((campaign, i) => (
                    <div key={i}>
                      {i !== 0 && <tr className="spacer"></tr>}
                      <Campaign>
                        <td>{campaign.des_titulo}</td>
                        <td>
                          {campaign.vlr_arrecadado} / {campaign.vlr_objetivo}
                        </td>
                        <td>
                          {new Date(campaign.dat_fim).getDate() +
                            '/' +
                            (new Date(campaign.dat_fim).getMonth() + 1) +
                            '/' +
                            new Date(campaign.dat_fim).getFullYear()}
                        </td>
                      </Campaign>
                    </div>
                  ))}
                </OverlayScrollbarsComponent>
              </tbody>
            </Table>
          </CampaignContainer>
          <Button
            inverted
            height="8vh"
            width="15vw"
            fontSize="1.5em"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Doe para esta ONG!
          </Button>
          <Modal
            isOpen={modalOpen}
            onRequestClose={() => {
              setModalOpen(false);
            }}
            style={ModalStyles}
          >
            <h1 style={{ marginBottom: 10 }}>Doar para a {ong.nom_ONG}</h1>
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
                value={vlrDoacao}
                onChange={e => {
                  setVlrDoacao(e.target.value);
                }}
              />
              <FormContainer>
                <Button
                  width="50%"
                  height="6vh"
                  fontSize="1.8em"
                  onClick={e => doar(e)}
                >
                  Doar
                </Button>
              </FormContainer>
            </form>
          </Modal>
        </>
      )}
    </Container>
  );
};

ongPage.layout = FormPageLayout;
ongPage.getLayoutConfig = {
  header: {
    title: 'ONG',
    logo: true
  },
  footer: {
    back: true
  }
};

export default ongPage;
