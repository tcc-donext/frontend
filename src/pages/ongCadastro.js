import { useState, useEffect } from 'react';
import FormPageLayout from 'components/layouts/FormPageLayout';
import InputMask from "react-input-mask";
import { StyledLabel } from 'components/Input/styles';
import api from 'services/api'
import { useRouter } from 'next/router';
import { useAuth } from './../contexts/auth';

import {
  Container,
  Image,
  Divider,
  Tabs,
  TabsLabel,
  TabsForm,
  Row,
  H1Container,
  ButtonContainer
} from 'styles/pages/ongCadastro';
import Button from 'components/Button';
import TabsC from 'components/Tabs';

import Input from 'components/Input';


const OngCadastro = () => {
  const [values,setValues] = useState({
    nomeONG: '',
    cnpj: '',
    emailONG: '',
    senha: '',
    nomecontato: '',
    emailcontato: '',
    DDD: '',
    telefone: '',
    endereco: '',
    CEP: '',
    UF: '',
    municipio: ''
  })
  const router = useRouter();
  const [ufs,setufs] = useState([])
  const [selectedUF,setselectedUF] = useState([])
  const [municipios,setmunicipios] = useState([])
  const { signIn } = useAuth();

  useEffect(() => {
    async function getUFs(){
    let promiseResponse = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    let jsonResponse = await promiseResponse.json()
    setufs(jsonResponse)
    }
    getUFs()
  }, []);

  useEffect(() => {
    async function getMunicipios(){
    let promiseResponse = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios
    `)
    let jsonResponse = await promiseResponse.json()
    setmunicipios(jsonResponse)
    }
    getMunicipios()
  }, [selectedUF]);

  function getInputStyle(width){ 
    var Styles = { 
      border: '0', 
      borderRadius: '2.75pt', 
      height: '6.5vh', 
      width: width || '29vw', 
      outline: 'none', 
      backgroundColor: '#ebebeb', 
      padding: '2.5% 5% 2.5% 4%', 
      fontSize: '1.25em', 
      color: '#403e4d', } 
      return Styles; 
    }

  function handleChange(ev){
    setValues({
      ...values,
      [ev.target.name]: ev.target.value
    })
    if(ev.target.name =="UF"){
      setselectedUF(ev.target.value)
    }
  }

  async function handleSubmit(e){
    e.preventDefault()
    console.log(values);

    const data = {
      cod_CNPJ: values.cnpj.replace(/\D/g,''),
      nom_ONG: values.nomeONG,
      des_endereco: values.endereco,
      nro_cep: values.CEP.replace(/\D/g,''),
      des_email: values.emailONG,
      seq_contato: 1,
      nom_pessoa: values.nomecontato,
      nro_ddd: values.DDD.replace(/\D/g,''),
      nro_telefone: values.telefone.replace(/\D/g,''),
      des_senha: values.senha
    }
    try{
     const response = await api.post("ongs", data)
     const success = await signIn(values.emailONG, values.senha);
     router.push('/perfilOng')
    }
     catch(err){
       console.log(err)
     }
  }

  return (
    <Container>
      {console.log(values)}
      <TabsC Handle={handleSubmit}>
        <div label="inicial" key={0}>
          <Input name="nomeONG" label="Nome da ONG" type="text" width="29vw" value={values.nomeONG} onChange={handleChange} />
          <div style={{paddingBottom: '3.5vh'}}>
          <StyledLabel>CNPJ</StyledLabel>
          <InputMask mask="99.999.999/9999-99" name="cnpj" type="text" value={values.cnpj} onChange={handleChange} style={getInputStyle("29vw")} />
          </div>
          <Input name="emailONG" label="Email" type="email" width="29vw" value={values.emailONG} onChange={handleChange} />
          <Input name="senha" label="Senha" type="password" width="29vw" value={values.senha} onChange={handleChange} />
        </div>
        <div label="Contato" key={1}>
          <Input name="nomecontato" label="Nome" type="text" width="29vw" value={values.nomecontato} onChange={handleChange} />
          <Input name="emailcontato" label="Email" type="email" width="29vw" value={values.emailcontato} onChange={handleChange} />
          <Row>
            <div style={{paddingBottom: '3.5vh'}}>
              <StyledLabel>DDD</StyledLabel>
              <InputMask mask="+99" name="DDD" type="text" value={values.DDD} onChange={handleChange} style={getInputStyle("6vw")} />
            </div>
            <div style={{paddingBottom: '3.5vh', marginLeft: '2vw'}}>
              <StyledLabel>Telefone</StyledLabel>
              <InputMask mask="9999-9999" name="telefone" type="text" value={values.telefone} onChange={handleChange} style={getInputStyle("12vw")} />
            </div>
          </Row>
        </div>
        <div label="Endereço" key={2}>
        <Input name="endereco" label="Endereço" type="text" width="29vw" value={values.endereco} onChange={handleChange} />
        <Input name="CEP" label="CEP" type="text" width="14.5vw" value={values.CEP} onChange={handleChange} />
        <Row>
          <div>
          <StyledLabel>UF</StyledLabel>
          <select name="UF" value={values.UF} onChange={handleChange} style={getInputStyle("6vw")}>
            <option value=""> </option>
            { ufs.map((Estado,index) =>{
              return <option key={index} value={Estado.sigla}>{Estado.sigla}</option>
            })}
          </select>
          </div>
          <div style={{paddingBottom: '3.5vh', marginLeft: '2vw'}}>
          <StyledLabel>Munícipio</StyledLabel>
          <select name="municipio" value={values.municipio} onChange={handleChange} style={getInputStyle("14vw")}>
            { municipios.map((municipio,index) =>{
              return <option key={index} value={municipio.nome}>{municipio.nome}</option>
            })}
          </select>
          </div>
        </Row>
        </div>
        </TabsC>
      <aside>
        <Image
          src="/images/tela_login.png"
          alt="Desenho decorativo para a página"
        />
      </aside>
    </Container>
  );
};

OngCadastro.layout = FormPageLayout;
OngCadastro.getLayoutConfig = {
  header: {
    title: 'Cadastrar ONG',
    logo: true
  },
  footer: {
    back: true
  }
};

export default OngCadastro;