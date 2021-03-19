import FormPageLayout from 'components/layouts/FormPageLayout';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
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

const GerenciarCampanha = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalCampanha, setmodalCampanha] = useState(false);
  const [currentCampaign, setcurrentCampaign] = useState(null);
  const [loadedAuth, setLoadedAuth] = useState(false);
  const [campaignsData, setCampaingsData] = useState([]);
  const { signed, user } = useAuth();
  const router = useRouter();

  const infCampaigns = async id => {
    try {
      const response = await api.get('/campanhas');
      console.log(response.data);
      setCampaingsData(response.data);
    } catch (err) {
      console.warn(`Não foi possível recuperar as informações da Ong. ${err}`);
    }
  };

  useEffect(() => {
    if (loadedAuth) {
      if (!signed) {
        router.push('/');
      } else {
        infCampaigns(user.id);
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

  return (
    <Container>
      <ImgContainer size="3vw">
        <img src="/images/options.png" alt="opções do perfil" />
      </ImgContainer>
      <CardContainer>
        <Card>
          <ImgContainer size="1vw">
            <img src="/images/infoicon.png" alt="opções do perfil" />
          </ImgContainer>
          <ImgContainerCenter>
            <img src="/images/payment.png" alt="opções do perfil" />
          </ImgContainerCenter>
          <TextContainer>
            <p>
              <b>R$ 100,00</b>
            </p>
            <p>doações livres</p>
          </TextContainer>
        </Card>
        <Card>
          <ImgContainer size="1vw">
            <img src="/images/infoicon.png" alt="opções do perfil" />
          </ImgContainer>
          <ImgContainerCenter>
            <img src="/images/heart.png" alt="opções do perfil" />
          </ImgContainerCenter>
          <TextContainer>
            <p>
              <b>R$ 2000,00</b>
            </p>
            <p>doações por campanhas</p>
          </TextContainer>
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
                  <th>Doadores</th>
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
                        <td>7</td>
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
