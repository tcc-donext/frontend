import { useEffect, useState } from 'react';
import api from 'services/api';

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
      {!!campaign.fotos[0] ? (
        <CampaignImage src={campaign.fotos[0]} />
      ) : (
        <CampaignNoImage />
      )}
      <ContentSection>
        <CampaignTitle>{campaign.des_titulo}</CampaignTitle>
        <OngSection>
          {ong?.foto ? <OngImage src={ong.foto} /> : <OngNoImage />}
          {ong && (
            <OngData>
              <p>{ong['nom_ONG']}</p>
              <span>{`${ong['des_endereco']} - CEP: ${ong['nro_cep']}`}</span>
            </OngData>
          )}
        </OngSection>
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
    </CampaignContainer>
  );
};

export default Campaign;
