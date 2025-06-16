import styled, { createGlobalStyle, css } from 'styled-components'

//el metodo attrs se usa para agregar atributos HTML por defecto. Aqui se esta agregando 'tabIndex=0' a cada Block
//para que sea focuseable con el teclado. El color azul es el color por defecto del texto
//El atributo tabIndex funciona para que un elemento sea enfocado al hacer Tab (en el orden secuencial de otros elementos
//con el mismo atributo)
const Block = styled.div.attrs(()=>({tabIndex:0}))`
  color:blue;
  &:hover{
    color:#678;
  }
  & ~ &{
    background-color:#849;
  }
  &+&{
    background-color: #195;
  }
  &.text-lg{
    background-color:#5F5;
  }
  .inside &{
    background-color:#F66;
  }
`;

const Input = styled.input.attrs(()=>({type:'checkbox'}))``;
const Label = styled.label`
  align-items:center;
  display:flex;
  gap:8px;
  margin-bottom:8px;
`;
const TextLabel = styled.span`
  ${(props)=>{
    switch(props.$mode){
      case 'dark':
        return css`
          background-color:gray;
          color:#fff;
          ${Input}:checked + &&{
            color:blue;
          }
        `;
      default:
        return css`
          background-color:#727;
          color:#fff;
          ${Input}:checked+&&{
            color:#222;
          }
        `;
    }
  }

  }
`;

//${Input}:checked+&& representa  que si hay un input antes de elemento actual marcado, entonces dale los siguientes estilos


//&&: aumenta la especificidad del selector, asi no otro estilo que lo pueda sobre escribir.
//Como Thing genera una clase (.sb-123). Con &&, hace que el selector final sea .sb-123.sb-123
//Es decir mas especifico que un .sb-123
const Thing = styled.div`
  &&{
    color:red;
  }
  .something{
    border: 1px solid gold;
  }
`;

//Este estilo global afecta a todos los div que tengan el selector generado por 'Thing'
//Como Thing usa el &&, entonces el color del texto es rojo
const GlobalStyle = createGlobalStyle`
  div${Thing}{
    color:blue;
  }
`;

//REGLA GENERAL DE &
//.name-class{} -> Se refiere al elemento hijo de esa clase
//&.name-class{} -> Se refiere al mismo elemento si tiene el mismo nombre de clase
//.name-class &{} -> Se refiere cuando el elemento actual esta dentro del elemento con el nombre de la clase
export default function Pseudo() {
  return (
    <div>
      <Block>Hola buenas tardes</Block>
      <Block>Hola buenos dias</Block>
      <p>Hola</p>
      <Block>Hola buenas noches</Block>
      <Block className='text-lg'>Durmiendo...</Block>
      <div className='border-2 border-gray-500 inside'>
        <Block>Dentro de un bloque</Block>
      </div>
      <Label>
        <Input/>
        <TextLabel $mode="dark">JavaScript</TextLabel>
      </Label>
      <Label>
        <Input/>
        <TextLabel>TypeScript</TextLabel>
      </Label>
      <GlobalStyle/>
        <Thing>Quiero jugar y comer</Thing>
      <Thing>
        <label htmlFor="" className='something'>Quiero mi chaufa</label>
      </Thing>
    </div>
  )
}
