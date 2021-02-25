import { Container, Image, Divider, Tabs, TabsLabel, TabsForm, Row, H1Container, ButtonContainer, HiddenBox, TabChangeButton} from 'styles/pages/ongCadastro';
import { useState } from 'react'
import Button from 'components/Button';
import { Formik, Form } from 'formik';

const TabsC = props => {
  const [activeTab, setactiveTab] = useState(0);
  
  function NextTab(){
    setactiveTab(activeTab+1)
  }

  function PreviousTab(){
    setactiveTab(activeTab-1)
  }

  return(
      <Tabs>
      <TabsLabel>
      {props.children.map((children,index) =>{
         if(index == activeTab){
          return(
            <H1Container key={index} background="#7fe3e3">
            <h1>{children.props.label}</h1>
            </H1Container>
          )
        }else{
          return(
            <H1Container key={index} background="#ebebeb">
            <h1>{children.props.label}</h1>
            </H1Container>
          )
        }
      })}
      </TabsLabel>
      <TabsForm onSubmit={props.Handle}>
      {props.children.map((children, index) => {
            if (index == activeTab) {
              return children;
            }else{
              return(
                <HiddenBox>
                  {children}
                </HiddenBox>
              )
            }
          })}
          {activeTab == 2 ? (
            <div>
              <Button>Cadastrar</Button>
              <Button onClick={PreviousTab} type="button" style={{ marginRight: '2vw'}}>Anterior</Button>
            </div>
          ) : activeTab == 1 ? (
            <div>
              <TabChangeButton onClick={NextTab} type="button">Próximo</TabChangeButton>
              <Button onClick={PreviousTab} type="button" style={{ marginRight: '2vw'}}>Anterior</Button>
            </div>
          ) : (
            <Button onClick={NextTab} type="button">Próximo</Button>
          )}
      </TabsForm>
      </Tabs>
  )
}

export default TabsC;