import { useState, useEffect } from 'react';
import FormPageLayout from 'components/layouts/FormPageLayout';
import Link from 'next/link';
import { useAuth } from './../../contexts/auth';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import {
  CampaignImage,
  CampaignNoImage,
  CampaignTitle,
  OngImage,
  OngNoImage,
  ContentSection,
  OngData,
  ProgressBar
} from '../../components/Campaign/styles';

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
    top: '8.5vh',
    left: '36vw',
    right: '36vw',
    bottom: '8.5vh',
    backgroundColor: '#f6f6f6',
    zIndex: '5'
  }
};

const ModalStyleExpired = {
  content: {
    position: 'absolute',
    top: '30vh',
    left: '36vw',
    right: '36vw',
    bottom: '32vh',
    backgroundColor: '#f6f6f6',
    zIndex: '5'
  }
};

const ongPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [currentCampaign, setCurrentCampaign] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [vlrDoacao, setVlrDoacao] = useState(0);
  const [ong, setOng] = useState();
  const [ongCampaigns, setOngCampaigns] = useState();
  const [loadedAuth, setLoadedAuth] = useState(false);
  const { signed, user } = useAuth();

  useEffect(() => {
    if (localStorage.getItem('alterado') == 'true') {
      toast.success(
        "Você doou para '" + localStorage.getItem('nomeCampanhaDoada') + "'"
      );
    }
    localStorage.setItem('alterado', false);
    localStorage.setItem('nomeCampanhaDoada', null);
  }, []);

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

    if (currentCampaign) {
      doarCampanha();
    } else {
      try {
        await api.post('/doacaoDireta', {
          id_ong: pid,
          dat_doacao: new Date(),
          vlr_doacao: vlrDoacao
        });

        toast.success('Você doou para ' + ong.nom_ONG, 'Success');
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const doarCampanha = async () => {
    setModalOpen(false);

    if (signed && user.isOng) {
      toast.error('Operação não permitida.');
    } else {
      let data = {
        id_ong: currentCampaign.id_ong,
        seq_campanha: currentCampaign.seq_campanha,
        Dat_doacao: new Date(),
        vlr_doacao: vlrDoacao
      };

      let objetivo = parseFloat(
        currentCampaign.vlr_objetivo.split(' ')[1].replace(/[.]/g, '')
      );
      let arrecadado = parseFloat(
        currentCampaign.vlr_arrecadado.split(' ')[1].replace(/[.]/g, '')
      );

      if (vlrDoacao <= 0) {
        toast.error('O valor a doar está incorreto! 🤷‍♂️');
      } else if (objetivo <= arrecadado) {
        toast.warn('A meta dessa campanha já foi alcançada! 😁');
      } else if (new Date() > new Date(currentCampaign.dat_fim)) {
        toast.warn('Essa campanha já expirou! 🤞');
      } else {
        try {
          const response = await api.post(`/doacaoCampanha`, data);

          if (response.status == 200) {
            localStorage.setItem('alterado', true);
            localStorage.setItem(
              'nomeCampanhaDoada',
              currentCampaign.des_titulo
            );
          }
          router.reload();
        } catch (err) {
          console.warn(`Não foi possível doaar para campanha. ${err}`);
          toast.error('Erro ao doar para campanha');
        }
      }
      setCurrentCampaign(null);
    }
  };

  const OpenCampanha = key => {
    setCurrentCampaign(key);
    setModalOpen(true);
  };

  useEffect(() => {
    if (signed != null) {
      setLoadedAuth(true);
    }
  }, [signed]);

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
            Campanhas criadas! <span>({ongCampaigns.length}/10)</span>
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
                      <Campaign
                        onClick={() =>
                          !signed || (signed && user.isOng)
                            ? null
                            : OpenCampanha(campaign)
                        }
                      >
                        <td>{campaign.des_titulo}</td>
                        <td>
                          {campaign.vlr_arrecadado} / {campaign.vlr_objetivo}
                        </td>
                        {campaign && new Date() > new Date(campaign.dat_fim)
                          ? [
                              <td style={{ color: '#c40000' }}>
                                {' '}
                                {new Date(campaign.dat_fim).getDate() +
                                  '/' +
                                  (new Date(campaign.dat_fim).getMonth() + 1) +
                                  '/' +
                                  new Date(campaign.dat_fim).getFullYear()}
                              </td>
                            ]
                          : [
                              <td>
                                {new Date(campaign.dat_fim).getDate() +
                                  '/' +
                                  (new Date(campaign.dat_fim).getMonth() + 1) +
                                  '/' +
                                  new Date(campaign.dat_fim).getFullYear()}
                              </td>
                            ]}
                      </Campaign>
                    </div>
                  ))}
                </OverlayScrollbarsComponent>
              </tbody>
            </Table>
          </CampaignContainer>
          {!signed || (signed && user.isOng) ? (
            <p>
              Deseja doar?{' '}
              <Link href="/login">
                <a>Faça login como doador</a>
              </Link>
            </p>
          ) : (
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
          )}
          <Modal
            isOpen={modalOpen}
            onRequestClose={() => {
              setModalOpen(false);
              setCurrentCampaign(null);
            }}
            style={
              currentCampaign && new Date() > new Date(currentCampaign.dat_fim)
                ? ModalStyleExpired
                : ModalStyles
            }
          >
            {currentCampaign
              ? [
                  <>
                    <CampaignTitle>{currentCampaign.des_titulo}</CampaignTitle>
                    <h2 style={{ marginBottom: '10px', marginTop: '10px' }}>
                      {currentCampaign.des_geral}
                    </h2>
                    {new Date() > new Date(currentCampaign.dat_fim) ? (
                      <p
                        style={{
                          color: 'red'
                        }}
                      >
                        {'A campanha foi finalizada dia '}
                        {new Date(currentCampaign.dat_fim).getDate() +
                          '/' +
                          (new Date(currentCampaign.dat_fim).getMonth() + 1) +
                          '/' +
                          new Date(currentCampaign.dat_fim).getFullYear()}
                      </p>
                    ) : (
                      <p>
                        Fim:{' '}
                        {new Date(currentCampaign.dat_fim).getDate() +
                          '/' +
                          (new Date(currentCampaign.dat_fim).getMonth() + 1) +
                          '/' +
                          new Date(currentCampaign.dat_fim).getFullYear()}
                      </p>
                    )}
                    <FormContainer>
                      <p
                        className="valueLabel"
                        style={{
                          color: '#2f2e41',
                          fontWeight: 'bold',
                          paddingBottom: 5
                        }}
                      >{`${currentCampaign.vlr_arrecadado} / ${currentCampaign.vlr_objetivo}`}</p>
                      <ProgressBar
                        goal={parseFloat(
                          currentCampaign.vlr_objetivo
                            .split(' ')[1]
                            .replace('.', '')
                        )}
                        current={parseFloat(
                          currentCampaign.vlr_arrecadado
                            .split(' ')[1]
                            .replace('.', '')
                        )}
                      />
                    </FormContainer>
                  </>
                ]
              : [
                  <h1 style={{ marginBottom: 50 }}>
                    Doar para a {ong.nom_ONG}
                  </h1>
                ]}

            {currentCampaign &&
            new Date() > new Date(currentCampaign.dat_fim) ? null : (
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
                  type="month"
                  width="14vw"
                  style={{ marginBottom: '2vh', marginLeft: '9vw' }}
                />
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
            )}
          </Modal>
        </>
      )}

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
