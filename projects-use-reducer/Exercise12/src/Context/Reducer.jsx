const myReducer = (state, action)=>{

  switch(action.type){
    case "addLetra":
      return [...state, action.payload];
  }
}

export default myReducer