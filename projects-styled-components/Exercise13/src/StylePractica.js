import styled, { css, keyframes } from "styled-components";

export const ContainBar = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
`;

export const Title = styled.div`
  font-size:50px;
  font-family:system-ui;
  color:${({$micolor})=>$micolor};
  text-shadow:2px 2px 12px ${({$micolor})=>$micolor};
`;

export const Square = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  border-left:2px solid #fff;
  border-bottom:2px solid #fff;
  margin-top:50px;
  height:200px;
  position:relative;
`;

const animacion = (altura, desde)=>keyframes`
  0%{
    height:${desde}px;
  }100%{
    height:${altura}px;
  }
`;


export const BarColor = styled.div`
  animation: 1.5s ${({$heightbar, $desde})=>animacion($heightbar, $desde)} ease-out;
  align-self:flex-end; 
  height:${({$heightbar})=>$heightbar}px;
  width:40px;
  background-color:${({$colorbar})=>$colorbar?$colorbar:"gray"};
  margin-right:10px;
  margin-left:10px;
  margin-bottom:10px;
  animation-fill-mode:forwards;
  box-shadow: 0 0 10px ${({$colorbar})=>$colorbar?$colorbar:"gray"};
`;

export const Line = styled.div`
  position: absolute;
  top: 20px; /* Distancia desde el borde superior */
  margin-left:10px;
  left: 0;
  width: 90%;
  height: 1px; /* Grosor de la línea */
  background-color: #fff;
`;