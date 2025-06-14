import { createSlice } from "@reduxjs/toolkit";

export const firstSlice = createSlice({
  name:'oneSlice',
  initialState:{contratados:[]},
  reducers:{
    addPersona:(state, action)=>{
      state.contratados = [...state.contratados, action.payload];
    },
    deletePersona:(state, action)=>{
      state.contratados = state.contratados.filter((x)=>x.id!==action.payload);;
    },
    addPlace:(state, action)=>{
      const {id, place} = action.payload;
      state.contratados = state.contratados.map((x)=>{
        if(x.id===id){
          return{...x, place:place};
        }else{
          return x;
        }
      }) 
    }
  }
});

export const secondSlice = createSlice({
  name:"sldCandidatos",
  initialState:{candidatos:[]},
  reducers:{
    addCandidato:(state, action)=>{
      state.candidatos=[...state.candidatos, ...action.payload];
    },
    eliminarCandidato:(state, action)=>{
      state.candidatos = state.candidatos.filter(x=>x.username!==action.payload);
      //console.log(state.candidatos);
      
    }
  }
});

export const {addPersona, deletePersona, addPlace} = firstSlice.actions;
export const {addCandidato, eliminarCandidato} = secondSlice.actions;