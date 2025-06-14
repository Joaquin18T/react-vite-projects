import types from '../Components/Types'

export const myReducer2 = (state, action)=>{
  switch(action.type){
    case types.contratar:
      const addPlace = {name:action.payload.name, precio: action.payload.precio};
      return [...state, addPlace];
    case types.anular:
      const lugarAnulado = state.filter(({name})=>name!==action.payload);
      return [...lugarAnulado];
    default:
      return state;
  }
}