import types from '../Components/Types'

export const myReducer = (state={}, action)=>{
  switch(action.type){
    case types.login:
      return {...state,estado:action.payload, name:action.payload};
    case types.logout:
      return{dataPlace:[],estado:null};
    case types.contratar:
      const addPlace = [...state.dataPlace, {name:action.payload.name, precio: action.payload.precio}];
      return {...state, dataPlace:addPlace};
    case types.anular:
      const lugarAnulado = state.dataPlace.filter(({name})=>name!==action.payload);
      return {...state, dataPlace: lugarAnulado};
    default:
      return state;
  }
}