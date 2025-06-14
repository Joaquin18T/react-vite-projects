import styled,{css, keyframes} from 'styled-components';

const myColor = "black";

const animacion = (distancia)=>keyframes`
  0%{
    transform:rotate(0deg)
  }100%{
    transform:rotate(${distancia}deg)
  }
`;

export const Titulo = styled.div`
  width:100px;
  height:100px;
  background-color:${({color})=>color?color:"green"};
  ${({$borde})=>$borde&&
    css`
      border-radius:50%;
    `
  }
  margin:5px;
  &:hover{
    border: 1px solid ${myColor}
  }
`;

export const Contenedor = styled.div`
  display:flex;
`;

export const Moverse = styled.div`
  width:200px;
  height:100px;
  background-color:#222;
  animation:
    ${({distancia})=>animacion(distancia)} 
    ${({seg})=>seg}s ease-out;
  animation-fill-mode:forwards;
`;

export const Shadow = styled(Titulo)`
  box-shadow: 0 0 20px red;
`;
