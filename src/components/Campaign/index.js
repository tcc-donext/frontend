import { useEffect, useState } from 'react';
import Link from 'next/link';
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
    console.log(ongFetch.data[0][0]);

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
        <Link href={ong ? `/ong/${ong['id_ong']}` : ''}>
          <OngSection>
            {ong?.foto ? <OngImage src={ong.foto} /> : <OngNoImage />}
            {ong && (
              <OngData>
                <p>{ong['nom_ONG']}</p>
                <span>{`${ong['des_endereco']} - CEP: ${ong['nro_cep']}`}</span>
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
    </CampaignContainer>
  );
};

export default Campaign;
