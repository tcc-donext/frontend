import { useEffect, useState } from 'react';
import api from 'services/api';

import {
  CampaignContainer,
  CampaignImage,
  CampaignTitle,
  OngImage,
  OngData,
  ProgressBar
} from './styles';

const Campaign = ({ campaign }) => {
  const [ong, setOng] = useState(null);

  useEffect(async () => {
    const ongFetch = await api.get(`/ongs/${campaign.id_ong}`);

    setOng(ongFetch.data[0][0]);
  }, []);

  return (
    <CampaignContainer>
      <CampaignImage />
      <CampaignTitle>{campaign.des_titulo}</CampaignTitle>
      <OngImage src={'https://picsum.photos/600'} />
      {ong && (
        <OngData>
          <p>{ong['nom_ONG']}</p>
          <span>{`${ong['des_endereco']} - CEP: ${ong['nro_cep']}`}</span>
        </OngData>
      )}
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
