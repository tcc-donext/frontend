import FormPageLayout from 'components/layouts/FormPageLayout';


import Input from 'components/Input';
import { Container, 
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
  ImgContainerCenterColumn} from 'styles/pages/GerenciarCampanha'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const campaignsData = [
  {
    imageURL: 'https://picsum.photos/300',
    title: 'Tobias! ASMA',
    total_value: 150,
    target_value: 300,
    donors: 7
  },
  {
    imageURL: 'https://picsum.photos/300',
    title: 'Tobias! ASMA',
    total_value: 150,
    target_value: 300,
    donors: 7
  },
  {
    imageURL: 'https://picsum.photos/300',
    title: 'Tobias! ASMA',
    total_value: 150,
    target_value: 300,
    donors: 7
  },
  {
    imageURL: 'https://picsum.photos/300',
    title: 'Tobias! ASMA',
    total_value: 150,
    target_value: 300,
    donors: 7
  }
];

const GerenciarCampanha = () => {
  return (
    <Container>
      <ImgContainer size="3vw">
        <img 
        src="/images/options.png"
        alt="opções do perfil"
        />
      </ImgContainer>
      <CardContainer>
        <Card>
          <ImgContainer size="1vw">
            <img 
            src="/images/infoicon.png"
            alt="opções do perfil"
            />
          </ImgContainer>
          <ImgContainerCenter>
          <img 
          src="/images/payment.png"
          alt="opções do perfil"
          />
          </ImgContainerCenter>
          <TextContainer>
          <p><b>R$ 100,00</b></p>
          <p>doações livres</p>
          </TextContainer>
        </Card>
        <Card>
          <ImgContainer size="1vw">
            <img 
            src="/images/infoicon.png"
            alt="opções do perfil"
            />
          </ImgContainer>
          <ImgContainerCenter>
          <img 
          src="/images/heart.png"
          alt="opções do perfil"
          />
          </ImgContainerCenter>
          <TextContainer>
          <p><b>R$ 2000,00</b></p>
          <p>doações por campanhas</p>
          </TextContainer>
        </Card>
      </CardContainer>
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
            <OverlayScrollbarsComponent style={{ maxHeight: '22vh' }}>
              {campaignsData.map((campaign, i) => (
                <div key={i}>
                  {i !== 0 && <tr className="spacer"></tr>}
                  <Campaign>
                    <td>{campaign.title}</td>
                    <td>
                      R$ {campaign.total_value}/{campaign.target_value}
                    </td>
                    <td>{campaign.donors}</td>
                  </Campaign>
                </div>
              ))}
            </OverlayScrollbarsComponent>
          </tbody>
        </Table>
      </CampaignContainer>
      <AddCampaingContainer>
        <AddCampaing>
          <ImgContainerCenterColumn>
            <img 
            src="/images/plus.png"
            alt="opções do perfil"
            />
          </ImgContainerCenterColumn>        
        </AddCampaing>
      </AddCampaingContainer>
    </Container>
  )
}
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