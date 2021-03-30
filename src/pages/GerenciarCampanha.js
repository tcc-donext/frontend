import FormPageLayout from 'components/layouts/FormPageLayout';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import moment from 'moment';
import CampaignInfo from 'components/CampaignInfo/index';
import {
  Container,
  ImgContainer,
  Card,
  ImgContainerCenter,
  TextContainer,
  CardContainer,
  CampaignSubtitle,
  CampaignContainer,
  Table,
  Campaign,
  AddCampaing,
  AddCampaingContainer,
  ImgContainerCenterColumn
} from 'styles/pages/GerenciarCampanha';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useAuth } from 'contexts/auth';
import api from 'services/api';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ModalStyles = {
  content: {
    position: 'absolute',
    top: '100px',
    left: '140px',
    right: '140px',
    bottom: '100px',
    backgroundColor: '#f6f6f6',
    zIndex: '5'
  }
};

const ModalDonationStyles = {
  content: {
    position: 'absolute',
    top: '20vh',
    left: '38vw',
    right: '38vw',
    bottom: '20vh',
    backgroundColor: '#f6f6f6',
    padding: '30px',
    zIndex: '5'
  }
};

const GerenciarCampanha = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalDonationIsOpen, setModalDonationOpen] = useState(false);
  const [isDirect, setIsDirect] = useState(true);
  const [directDonation, setDirectDonation] = useState([]);
  const [campaignDonation, setCampaignDonation] = useState([]);
  const [modalCampanha, setmodalCampanha] = useState(false);
  const [currentCampaign, setcurrentCampaign] = useState(null);
  const [loadedAuth, setLoadedAuth] = useState(false);
  const [campaignsData, setCampaingsData] = useState([]);
  const [valorTotalDoacaoCampanha, setValorTotalDoacaoCampanha] = useState(
    null
  );
  const [valorTotalDoacaoDireta, setValorTotalDoacaoDireta] = useState(null);
  const { signed, user } = useAuth();
  const router = useRouter();

  const infCampaigns = async id => {
    try {
      const response = await api.get(`/profile/${id}`);
      setCampaingsData(response.data);
    } catch (err) {
      console.warn(`Não foi possível recuperar as informações da Ong. ${err}`);
    }
  };

  const searchDoacoesDiretas = async id => {
    try {
      const response = await api.get(`/doacaoDireta/${id}`);
      let doacoes = response.data.doacao_direta;
      setDirectDonation(response.data.doacao_direta);

      let dinheiro = 0;
      for (let i = 0; i <= doacoes.length; i++) {
        let valor = Number(doacoes[i].vlr_doacao.replace(/[^0-9-]+/g, ''));
        valor = valor / 100;
        dinheiro = dinheiro + valor;
        setValorTotalDoacaoDireta(dinheiro);
      }
    } catch (err) {
      console.warn('Não foi possível recuperar as informações da Ong.');
    }
  };

  const searchDoacoesCampanha = async id => {
    try {
      const response = await api.get(`/doacaoCampanha/${id}`);
      let doacoes = response.data.doacao_campanha;
      setCampaignDonation(response.data.doacao_campanha);

      let dinheiro = 0;
      for (let i = 0; i <= doacoes.length; i++) {
        let valor = Number(doacoes[i].vlr_doacao.replace(/[^0-9-]+/g, ''));
        valor = valor / 100;
        dinheiro = dinheiro + valor;
        setValorTotalDoacaoCampanha(dinheiro);
      }
    } catch (err) {
      console.warn('Não foi possível recuperar as informações da Ong.');
    }
  };

  useEffect(() => {
    if (loadedAuth) {
      if (!signed) {
        router.push('/');
      } else {
        infCampaigns(user.id);
        searchDoacoesDiretas(user.id);
        searchDoacoesCampanha(user.id);
      }
    }
  }, [loadedAuth]);

  useEffect(() => {
    if (signed != null) {
      setLoadedAuth(true);
    }
  }, [signed]);

  function closeModal() {
    setIsOpen(false);
  }

  function OpenModal() {
    setIsOpen(true);
  }

  const OpenCampanha = key => {
    setcurrentCampaign(key);
    setmodalCampanha(true);
  };

  const CloseCampanha = () => {
    setmodalCampanha(false);
  };

  const showDirectDonation = () => {
    if (directDonation.length == 0) {
      toast.warn('Você ainda não tem doações livres!');
    } else {
      setIsDirect(true);
      setModalDonationOpen(true);
    }
  };

  const showCampaignDonation = () => {
    if (campaignDonation.length == 0) {
      toast.warn('Você ainda não tem doações para campanhas!');
    } else {
      setIsDirect(false);
      setModalDonationOpen(true);
    }
  };

  return (
    <Container>
      <ImgContainer size="3vw">
        <img
          style={{ cursor: 'pointer' }}
          src="/images/options.png"
          alt="opções do perfil"
          onClick={() => {
            router.push('/perfilOng');
          }}
        />
      </ImgContainer>
      <CardContainer>
        <Card
          onClick={() => showDirectDonation()}
          style={{ cursor: 'pointer' }}
        >
          <ImgContainer size="1vw">
            <img src="/images/infoicon.png" alt="opções do perfil" />
          </ImgContainer>
          <ImgContainerCenter>
            <img src="/images/payment.png" alt="opções do perfil" />
          </ImgContainerCenter>
          {valorTotalDoacaoDireta ? (
            <TextContainer>
              <p>
                <b>
                  {valorTotalDoacaoDireta.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </b>
              </p>
              <p>doações livres</p>
            </TextContainer>
          ) : (
            <TextContainer>
              <p>
                <b>Sem doação ainda :(</b>
              </p>
              <p>doações livres</p>
            </TextContainer>
          )}
        </Card>
        <Card
          onClick={() => showCampaignDonation()}
          style={{ cursor: 'pointer' }}
        >
          <ImgContainer size="1vw">
            <img src="/images/infoicon.png" alt="opções do perfil" />
          </ImgContainer>
          <ImgContainerCenter>
            <img src="/images/heart.png" alt="opções do perfil" />
          </ImgContainerCenter>
          {valorTotalDoacaoCampanha ? (
            <TextContainer>
              <p>
                <b>
                  {valorTotalDoacaoCampanha.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </b>
              </p>
              <p>doações por campanhas</p>
            </TextContainer>
          ) : (
            <TextContainer>
              <p>
                <b>Sem doação ainda :(</b>
              </p>
              <p>doações livres</p>
            </TextContainer>
          )}
        </Card>
      </CardContainer>
      {campaignsData ? (
        <div>
          <CampaignSubtitle>
            Campanhas ativas! <span>({campaignsData.length}/10)</span>
          </CampaignSubtitle>
          <CampaignContainer>
            <Table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Arrecadação</th>
                  <th>Data de Expiração</th>
                </tr>
              </thead>
              <tbody>
                <OverlayScrollbarsComponent
                  style={{ maxHeight: '22vh' }}
                  options={{ scrollbars: { visibility: 'hidden' } }}
                >
                  {campaignsData.map((campaign, i) => (
                    <div key={i}>
                      {i !== 0 && <tr className="spacer"></tr>}
                      <Campaign onClick={() => OpenCampanha(i)}>
                        <td>{campaign.des_titulo}</td>
                        <td>
                          R${' '}
                          {campaign.vlr_arrecadado.substring(
                            3,
                            campaign.vlr_arrecadado.length - 1
                          )}
                          /
                          {campaign.vlr_objetivo.substring(
                            3,
                            campaign.vlr_objetivo.length - 1
                          )}
                        </td>
                        <td>{moment(campaign.dat_fim).format('DD/MM/YYYY')}</td>
                      </Campaign>
                    </div>
                  ))}
                </OverlayScrollbarsComponent>
              </tbody>
            </Table>
          </CampaignContainer>
        </div>
      ) : null}
      <AddCampaingContainer>
        <AddCampaing onClick={OpenModal}>
          <ImgContainerCenterColumn>
            <img src="/images/plus.png" alt="opções do perfil" />
          </ImgContainerCenterColumn>
        </AddCampaing>
      </AddCampaingContainer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={ModalStyles}
      >
        <CampaignInfo campaign={null} />
      </Modal>

      <Modal
        isOpen={modalCampanha}
        onRequestClose={CloseCampanha}
        style={ModalStyles}
      >
        <CampaignInfo campaign={campaignsData[currentCampaign]} />
      </Modal>

      <Modal
        isOpen={modalDonationIsOpen}
        onRequestClose={() => setModalDonationOpen(false)}
        style={ModalDonationStyles}
      >
        {directDonation && isDirect ? (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h1 style={{ marginBottom: '10px' }}>Doações Livres!</h1>
              <img
                src="/images/payment.png"
                alt="opções do perfil"
                style={{ width: '1.5w', height: '2.7vw' }}
              />
            </div>

            {directDonation.map((donation, i) => (
              <div
                style={{
                  marginTop: '15px',
                  backgroundColor: '#fefefe',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '17px'
                }}
              >
                <p>
                  <strong>Data da doação:</strong>{' '}
                  {moment(donation.dat_doacao).format('DD/MM/YYYY')}
                </p>
                <p>
                  <strong>Nome do doador: </strong> {donation.nom_doador}
                </p>
                <p>
                  <strong>Valor da doação: </strong> {donation.vlr_doacao}
                </p>
              </div>
            ))}
          </>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h1 style={{ marginBottom: '10px' }}>Doações para Campanhas!</h1>
              <img
                src="/images/heart.png"
                alt="opções do perfil"
                style={{ width: '1.5w', height: '2.7vw' }}
              />
            </div>
            {campaignDonation.map((donation, i) => (
              <div
                style={{
                  marginTop: '15px',
                  backgroundColor: '#fefefe',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '17px'
                }}
              >
                <p>
                  <strong>Data da doação:</strong>{' '}
                  {moment(donation.Dat_doacao).format('DD/MM/YYYY')}
                </p>
                <p>
                  <strong>Campanha doada:</strong> {donation.des_titulo}
                </p>
                <p>
                  <strong>Nome do doador: </strong> {donation.nom_doador}
                </p>
                <p>
                  <strong>Valor da doação: </strong> {donation.vlr_doacao}
                </p>
              </div>
            ))}
          </>
        )}
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
    </Container>
  );
};
GerenciarCampanha.layout = FormPageLayout;
GerenciarCampanha.getLayoutConfig = {
  header: {
    title: 'Gerenciar Campanhas',
    logo: true
  },
  footer: {
    back: true
  }
};

export default GerenciarCampanha;
