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
import { useState } from 'react';
import { Formik, Form } from 'formik';
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import moment from 'moment'
import { useAuth } from 'contexts/auth'
import api from 'services/api'




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
  allowLeadingZeroes: false,
}
const curruncyStyle = {
  backgroundColor: '#ebebeb',
  color: '#403e4d',
  height: '6.5vh',
  border: 'none',
  fontSize: '1.25em',
  width: '32vw'
}

const CampaignInfo = props => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { user } = useAuth();
  

  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('/images/ebebeb.jpg');
  const [selectedFile, setSelectedFile] = useState();

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
      ...maskOptions,
    })
  
    return <MaskedInput mask={currencyMask} {...inputProps} />
  }

  



  return (
    <Formik
      initialValues={{
        nome: '',
        Descricao: '',
        categoria: '',
        objetivo: '',
        dataInicio: '',
        dataFim: '',
      }}
      onSubmit={ async (values) => {

        const data = {
          id_ong: user.id,
          des_titulo: values.nome,
          des_geral: values.Descricao,
          cod_categoria: values.categoria,
          dat_inicio: values.dataInicio,
          dat_fim: values.dataFim,
          vlr_objetivo: values.objetivo,
        }
          try{
            const response = await api.post("campanhas", data)
            console.log(response)

          }catch(err){
            console.log(err)
          }

      }}
      render={({ values, errors, touched, handleChange, handleSubmit }) => (
        <Form style={{ height: '99%' }} onSubmit={handleSubmit} >
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
                  type="select" name="categoria"
                  onChange={handleChange}
                  value={values.categoria}
                  id="categoria"
                >
                  <option value="categoria1">categoria1</option>
                  <option value="categoria2">categoria2</option>
                  <option value="categoria3">categoria3</option>
                </SelectArea>
              </InputField>
              <InputField>
                <label>Objetivo</label>
                <CurrencyInput 
                placeholder="R$0.00" type="text" style={curruncyStyle}
                name="objetivo"
                onChange={handleChange}
                value={values.objetivo}
                id="objetivo"
                />
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
                      var selectedDateStr = moment(date).format('DD.MM.YYYY')
                      setStartDate(date)
                      values.dataInicio = selectedDateStr;
                    }}
                    placeholderText="ínicio"
                    customInput={<Input width="15vw" fontSize="1em" />}
                  />
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={endDate}
                    onChange={date => {
                      var selectedDateStr = moment(date).format('DD.MM.YYYY')
                      setEndDate(date)
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
                  <Button type="submit" width="50%" height="8vh">
                    Publicar
                  </Button>
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
