import {
  Container,
  FormLayout,
  InputArea,
  InputField,
  Row,
  RowCenter,
  FileInputContainer,
  SelectArea
} from 'components/CampaignInfo/styles';
import Input from 'components/Input';
import Button from 'components/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import moment from 'moment';
import { useAuth } from 'contexts/auth';
import api from 'services/api';
import { useRouter } from 'next/router';

const defaultMaskOptions = {
  prefix: 'R$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 2,
  integerLimit: 10,
  allowNegative: false,
  allowLeadingZeroes: false
};
const curruncyStyle = {
  backgroundColor: '#ebebeb',
  color: '#403e4d',
  height: '6.5vh',
  border: 'none',
  fontSize: '1.25em',
  width: '32vw'
};

const CampaignInfo = props => {
  const [startDate, setStartDate] = useState(
    props.campaign ? new Date(props.campaign.dat_inicio) : null
  );
  const [endDate, setEndDate] = useState(
    props.campaign ? new Date(props.campaign.dat_fim) : null
  );
  const { user } = useAuth();
  const router = useRouter();

  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('/images/ebebeb.jpg');
  const [selectedFile, setSelectedFile] = useState();

  const [categorias, setCategorias] = useState([]);

  const [arrecadado, setArrecadado] = useState(0);

  useEffect(() => {
    async function getCategorias() {
      let response = await api.get('/categorias');
      setCategorias(response.data);
    }
    getCategorias();

    if (props.campaign) {
      let aux = props.campaign.vlr_arrecadado.split(' ')[1];
      aux = aux.replace(/[.]/g, '');
      aux = aux.replace(/[,]/g, '.');
      setArrecadado(parseFloat(aux));
    }
  }, []);

  const handleFileInputChange = e => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const CurrencyInput = ({ maskOptions, ...inputProps }) => {
    const currencyMask = createNumberMask({
      ...defaultMaskOptions,
      ...maskOptions
    });

    return <MaskedInput mask={currencyMask} {...inputProps} />;
  };

  const SubmitData = async (values, type) => {
    if (type == 1) {
      try {
        const response = await api.post('campanhas', values);
        console.log(response);
        router.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await api.put(
          `campanhas/${props.campaign.seq_campanha}`,
          values
        );
        router.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteCampaign = async () => {
    try {
      const response = await api.delete(
        `campanhas/${props.campaign.seq_campanha}`
      );
      router.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={{
        nome: props.campaign ? props.campaign.des_titulo : null,
        Descricao: props.campaign ? props.campaign.des_geral : null,
        categoria: props.campaign ? props.campaign.cod_categoria : 1,
        objetivo: props.campaign ? props.campaign.vlr_objetivo : null,
        dataInicio: props.campaign
          ? moment(props.campaign.dat_inicio).format('MM/DD/YYYY')
          : null,
        dataFim: props.campaign
          ? moment(props.campaign.dat_fim).format('MM/DD/YYYY')
          : null
      }}
      onSubmit={async values => {
        const data = {
          id_ong: user.id,
          des_titulo: values.nome,
          des_geral: values.Descricao,
          cod_categoria: values.categoria,
          dat_inicio: values.dataInicio,
          dat_fim: values.dataFim,
          vlr_objetivo: values.objetivo
        };
        if (!selectedFile) {
          props.campaign ? SubmitData(data, 2) : SubmitData(data, 1);
        }
        const reader = new FileReader();

        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
          data.img_campanha = reader.result;
          props.campaign ? SubmitData(data, 2) : SubmitData(data, 1);
        };
        reader.onerror = () => {
          console.error('AHHHHHHHH!!');
          setErrMsg('something went wrong!');
        };
      }}
      render={({ values, errors, touched, handleChange, handleSubmit }) => (
        <Form style={{ height: '99%' }} onSubmit={handleSubmit}>
          <Container>
            <FormLayout>
              <InputField>
                <label>Nome</label>
                <Input
                  type="text"
                  width="32vw"
                  name="nome"
                  onChange={handleChange}
                  value={values.nome}
                  id="nome"
                ></Input>
              </InputField>
              <InputField>
                <label>Descrição</label>
                <InputArea
                  name="Descricao"
                  onChange={handleChange}
                  value={values.Descricao}
                  id="Descricao"
                ></InputArea>
              </InputField>
              <InputField>
                <label>Categoria</label>
                <SelectArea
                  type="select"
                  name="categoria"
                  onChange={handleChange}
                  value={values.categoria}
                  id="categoria"
                >
                  {categorias.map((categoria, index) => {
                    return (
                      <option key={index} value={categoria.cod_categoria}>
                        {categoria.nom_categoria}
                      </option>
                    );
                  })}
                </SelectArea>
              </InputField>
              <InputField>
                <label>Objetivo</label>
                {arrecadado > 0 ? (
                  <CurrencyInput
                    placeholder="R$0.00"
                    disabled
                    type="text"
                    style={curruncyStyle}
                    name="objetivo"
                    onChange={handleChange}
                    value={values.objetivo}
                    id="objetivo"
                  />
                ) : (
                  <CurrencyInput
                    placeholder="R$0.00"
                    type="text"
                    style={curruncyStyle}
                    name="objetivo"
                    onChange={handleChange}
                    value={values.objetivo}
                    id="objetivo"
                  />
                )}

                {console.log(values)}
              </InputField>
            </FormLayout>
            <FormLayout>
              <InputField>
                <label>Data</label>
                <Row>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={startDate}
                    onChange={date => {
                      var selectedDateStr = moment(date).format('MM/DD/YYYY');
                      setStartDate(date);
                      values.dataInicio = selectedDateStr;
                    }}
                    placeholderText="ínicio"
                    customInput={<Input width="15vw" fontSize="1em" />}
                  />
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={endDate}
                    onChange={date => {
                      var selectedDateStr = moment(date).format('MM/DD/YYYY');
                      setEndDate(date);
                      values.dataFim = selectedDateStr;
                    }}
                    placeholderText="fim"
                    customInput={<Input width="15vw" fontSize="1em" />}
                  />
                </Row>
              </InputField>
              <InputField>
                <RowCenter>
                  <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '25vh', width: '15vw' }}
                  />
                  <FileInputContainer>
                    Adicionar Foto
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileInputChange}
                      value={fileInputState}
                    />
                  </FileInputContainer>
                </RowCenter>
              </InputField>
              <InputField>
                <RowCenter>
                  <Row
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <Button type="submit" width="50%" height="8vh">
                      {props.campaign ? 'Atualizar' : 'Publicar'}
                    </Button>
                    {props.campaign ? (
                      <Button
                        height="8vh"
                        onClick={deleteCampaign}
                        style={{
                          marginLeft: '3vw',
                          backgroundColor: 'LightCoral'
                        }}
                      >
                        Deletar
                      </Button>
                    ) : null}
                  </Row>
                </RowCenter>
              </InputField>
            </FormLayout>
          </Container>
        </Form>
      )}
    />
  );
};

export default CampaignInfo;
