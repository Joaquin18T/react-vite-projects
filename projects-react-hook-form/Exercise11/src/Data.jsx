export const datos=[{
  lugar:"Marítima",
  precio:210,
  imagen:"https://www.html6.es/curso/img/zonaMaritima.jpg"
},{
  lugar:"Ciudades",
  precio:175,
  imagen:"https://www.html6.es/curso/img/zonaCiudad.jpg"
},{
  lugar:"Naturales",
  precio:154,
  imagen:"https://www.html6.es/curso/img/zonaNatural.webp"
},{
  lugar:"De Riesgo",
  precio:52,
  imagen:"https://www.html6.es/curso/img/zonaAdrenalina.jpg"
}];

export const preguntas = [
  {
    pregunta: "Escribe tu nombre y apellidos",
    sufijo: "como nombre de usuario",
    validaciones:{requerido:"Este campo es obligatorio"},
    input:"text",
    tipo:0
  },
  {
    pregunta: "¿Cuantas habitaciones quieres?",
    sufijo:"habitaciones",
    validaciones:{
      requerido:"Este campo es obligatorio",
      maximo:"Escoge menos (como maximo es 7)",
      maxValue:7},
    input:"number",
    tipo:0
  },
  {
    pregunta:"¿Cuantas personas son?",
    sufijo:"personas",
    validaciones: {
      requerido:"Este campo es requerido",
      minimo:"Demasiado poco (como minimo es 1)",
      maximo:"Escoge menos (como maximo es 7)",
      maxValue:7,
      minValue:1
    },
    input:"number",
    tipo:0
  },
  {
    pregunta:"Selecciona el numero de dias",
    sufijo:"dias",
    validaciones:{
      requerido:"Este campo es requerido",
      minimo:"Demasiado poco (como minimo es 3)",
      minValue:3
    },
    input:"number",
    tipo:0
  },
  {
    pregunta:"¿Quieres modificar los datos o finalizar e imprimir tu pedido?",
    tipo:1
  }
];