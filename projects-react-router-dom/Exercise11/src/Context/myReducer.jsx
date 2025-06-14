import types from './Types'
export const myReducer = (state, action)=>{
  switch(action.type){
    case types.fase1:
      return {nombre: action.payload.nombre};
    case types.pregunta1:
      return {...state, persona:action.payload};
    case types.pregunta2:
      return {...state, habitaciones: action.payload};
    case types.pregunta3:
      return {...state, cantPersona: action.payload};
    case types.pregunta4:
      return {...state, dias: action.payload};
    case types.reset:
      return {};
      
  }
}