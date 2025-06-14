import types from './Types'

export const myReducer = (state, {type, payload})=>{
  switch(type){
    case types.agregar:
      return [...state, {nombre: payload.nombre, id:payload.id, star:1}];
    case types.ratear:
      return state.map((x)=>{
        if(x.id===payload){
          return {...x, star:x.star+1}
        }else{
          return x;
        }
      });
    case types.reset:
      return state.map(x=>{
        if(x.star===5){
          return {...x, star:0}
        }else{
          return x;
        }
      });
      
  }
}