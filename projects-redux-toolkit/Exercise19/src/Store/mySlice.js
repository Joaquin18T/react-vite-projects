import { createSlice } from "@reduxjs/toolkit";

export const origenSlice = createSlice({
  name:'firstSlice',
  initialState:{nombre:'Joaquin', edad:19,
    bibliotecas:[{nombre:"react", inicio:2013},{nombre:"redux", inicio:2015}]
  },
  reducers:{
    saveNombre:(state, action)=>{
      state.nombre = action.payload;
    },
    modificarValor:(state, action)=>{
      const {indice, nuevoNombre, nuevoInicio} = action.payload;

      //Formas para modificar el array bibliotecas
      //Forma 1:filtrar el indice a modificar y agregar el nuevo valor
      const filtrado = state.bibliotecas.filter((x, i)=>i!==indice);
      state.bibliotecas = [{nombre:nuevoNombre, inicio: nuevoInicio},...filtrado];

      //Forma 2: modificarlo directamente
      //state.bibliotecas[indice].nombre = nuevoNombre;
      //state.bibliotecas[indice].inicio = nuevoInicio;
    },
    agregarValor:(state, action)=>{
      const {nuevoNombre, nuevoInicio} = action.payload;
      state.bibliotecas = [...state.bibliotecas, {nombre:nuevoNombre, inicio: nuevoInicio}]
    },
    eliminarValor:(state, action)=>{
      state.bibliotecas = state.bibliotecas.filter(({nombre})=>nombre!==action.payload);
    }
  }
})

export const secondSlice = createSlice({
  name:'secondS',
  initialState:{puntuacion:0},
  reducers:{
    incrementar:(state)=>{
      state.puntuacion = state.puntuacion+1;
    }
  }
})

export const {saveNombre, modificarValor, agregarValor, eliminarValor} = origenSlice.actions;
export const {incrementar} = secondSlice.actions;