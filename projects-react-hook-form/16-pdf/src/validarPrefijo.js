const prefijos = [56,1];
export const validarPrefijo=(valor)=>{
  let valorPrefijo = Number(valor.substring(0,2));
  let validado = prefijos.indexOf(valorPrefijo);
  if(validado<0){
    valorPrefijo = Number(valor.substring(0,1));
    validado = prefijos.indexOf(valorPrefijo);
  }
  return validado>=0 && valor.length>=9 && valor.length<=11;
}