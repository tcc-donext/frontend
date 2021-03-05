import {
  CampaignContainer,
  CampaignImage,
  CampaignTitle,
  OngImage,
  OngData,
  ProgressBar
} from './styles';

const Campaign = ({ campaign }) => {
  return (
    <CampaignContainer>
      <CampaignImage />
      <CampaignTitle>{campaign.des_titulo}</CampaignTitle>
      <OngImage src={'https://picsum.photos/600'} />
      <OngData>
        <p>{'Nome da ONG'}</p>
        <span>{'Localização da ONG'}</span>
      </OngData>
      <ProgressBar
        goal={parseFloat(campaign.vlr_objetivo.split(' ')[1].replace('.', ''))}
        current={parseFloat(
          campaign.vlr_arrecadado.split(' ')[1].replace('.', '')
        )}
      />
    </CampaignContainer>
  );
};

export default Campaign;
