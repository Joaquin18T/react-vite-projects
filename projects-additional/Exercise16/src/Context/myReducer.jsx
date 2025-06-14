import types from "./Types";

export const myReducer = (state, {type, payload})=>{
  switch(type){
    case types.add:
      const {nombre, precio, imagen, id} = payload;
      return[...state, 
        {nombre:nombre, precio:precio, imagen:imagen, id:id}];
    case types.devolver:
      return state.filter(({id})=>id!==payload);
  }
  //console.log(state);
  
}