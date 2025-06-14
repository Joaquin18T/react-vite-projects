import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react'

export default function Practica() {
  const refBarra = useRef(null);//referencia a la barra amarilla
  const refComponent = useRef(null); //referencia para esconder un elemento JSX
  const [medida, setMedida] = useState(0);//ancho de la barra amarilla
  const [maxgrados, setMaxGrados] = useState(0);//grados que girara la ruleta
  const [lados, setLados] = useState(["muerte", "+1", "x2", "+8", "muerte", "+5", "x3", "+2"]); //Opciones de la ruleta
  const [monedas, setMonedas] = useState(["/moneda.png"]); //monedas segun la opcion elegida
  const [tickets, setTickets] = useState(["/ticket.png"]); //tickets segun la opcion elegida
  const [mensaje, setMensaje] = useState("Haz clic en lanzar"); //mensajes abajo de la ruleta
  const multiplos = [45,90,135,180,225,270,315,360]; //multiplos de 45 (la ruleta esta divido en 8 partes (total 360))
  const [cont, setCont] = useState(0); //contador de giradas

  /**
   * funcion que se ejecuta al hacer clic en girar la ruleta
   */
  const girar = ()=>{
    setMensaje("...Suerte...");//Primera actualizacion del estado que muestra un mensaje
    refComponent.current.classList.toggle("hiddenPart"); //Agrega una clase al div para que se oculte en la pantalla
    const widthBar = refBarra.current.offsetWidth; //obtiene el ancho actual de la barra amarilla
    setMedida(widthBar);//actualiza el estado con el ancho actual
    const random = Math.floor(Math.random()*70)+50;
    setMaxGrados(widthBar+maxgrados); //actualiza los grados que girara la ruleta
  }

  /**
   * Reordena el array de las opciones despues de una girada
   * @param {string} elegido opcion elegida de la ruleta
   */
  const reordenar = (elegido)=>{
    const index = lados.findIndex(x=>x===elegido); //almacena el indice donde se encuentra la opcion elegida
    const firstSlice = lados.slice(index);//almacena la parte cortada del array a partir de la opcion elegida (despues de la opcion)
    //console.log(firstSlice);
    const secondSlice = lados.slice(0,index);//almacena la parte cortada hasta donde se encuentra la opcion elegida (antes de la opcion)
    //console.log(secondSlice);
    setLados([...firstSlice, ...secondSlice]); //actualiza el estado con el orden de las opciones en nuevas posiciones
  }

  /**
   * Obtiene el valor de la opcion elegida de la ruleta
   */
  const opcionElegida = ()=>{
    refComponent.current.classList.toggle("hiddenPart"); //muestra el div escondido anteriormente
    setCont(cont+1);//actualiza el contador +1

    const test = cont>0?medida+23:medida; //condicion con el operador ternario que evalua si cont es mayor a 0
    const widthBar = redondear(test); //redondea el valor de test
    //o haciendo esta formula (medida % 360 + 360) % 360
    
    //If anidados donde hay rangos segun el vlaor de withBar, el array lados son las opciones de la ruta
    let msg = "";
    if(widthBar>0 && widthBar<=45){
      msg = lados[0];
    }else if(widthBar>45 && widthBar<=90){
      msg = lados[1];
    }else if(widthBar>90 && widthBar<=135){
      msg = lados[2];
    }else if(widthBar>135 && widthBar<=180){
      msg = lados[3];
    }else if(widthBar>180 && widthBar<=225){
      msg = lados[4];
    }else if(widthBar>225 && widthBar<=270){
      msg = lados[5];
    }else if(widthBar>270 && widthBar<=315){
      msg = lados[6];
    }else if(widthBar>315 && widthBar<=360){
      msg = lados[7];
    }
    console.log(msg);
    reordenar(msg);//reordena las opciones
    validarPuntos(msg); //segun la opcion elegida, calcula los puntos de las monedas y tickets
  }

  /**
   * Redondea el valor para asi obtener una opcion exacta de la ruleta
   * @param {Number} numero valor del ancho del barra amarilla
   * @returns //numero exacto para la obtencion de una opcion
   */
  const redondear = (numero)=>{
    let numFind = 0;
    let nuevoNumero = numero;

    //Si numFind es undefined, volvera a ejecutar el do while
    do{
      numFind = multiplos.find(x=>nuevoNumero<=x); //encuentra un valor mayor a partir de la lista multipls
      nuevoNumero = 360-nuevoNumero; //resta el valor del parametro para asi obtener un valor exacto del array
    }while(numFind==undefined);//Evalua si numFind es undefined

    console.log("numero aprox",numFind);
    
    return numFind; //retorna el valor exacto
  }

  /**
   * Calcula los puntos obtenidos a partir de la opcion elegida
   * @param {string} type opcion elegida de la ruleta
   */
  const validarPuntos = (type)=>{
    let acum =0;
    let espacios = [];
    let texto = "";

    //primer if: si son una de las cuatro opciones, sumara las monedas correspondientes y tickets y tendra otra oportunidad de girar
    //segundo if:si son una de las dos opciones, multiplicara las monedas segun las monedas actuales, quitara un ticket
    //tercer if: ya no podra girar nuevamente
    if(type==="+8" || type==="+5"||type==="+2"||type==="+1"){
      switch(type){
        case "+8":
          acum = 8;
          break;
        case "+5":
          acum = 5;
          break;
        case "+2":
          acum =2;
          break;
        case "+1":
          acum=1;
          break;
      }
      for (let i = 0; i < acum; i++) {
        espacios[i]="";
      }
      texto = `Sumas ${acum} y sigues jugando`; //mensaje a mostrar
      setTickets([...tickets, "/ticket.png"]);
    }else if(type==="x2" || type==="x3"){
      switch(type){
        case "x2":
          acum = 2;
          break;
        case "x3":
          acum = 3;
          break;
      }
      acum = monedas.length * acum;
      texto = `Doblas ${type} y ganas ${acum} monedas`; //mensaje a mostrar
      for (let i = 0; i <acum; i++) {
        espacios[i] = "";
      }

      let copy = tickets;
      copy = copy.slice(0,tickets.length-1);
      setTickets(copy);

    }else if(type==="muerte"){

      refComponent.current.classList.toggle("hiddenPart");
      texto = "Ya no puedes girar de nuevo";
    }
    setMensaje(texto);//actualizacion del estado segun de la opcion elegida

    if(acum>0){
      espacios = espacios.fill('/moneda.png'); //reemplazara todos los elementos del array por una moneda    
      setMonedas([...monedas,...espacios]);//actualiza su estado agregando mas monedas
    }
    espacios=[];
    acum=0;
  }

  useEffect(()=>{
    console.log("orden", lados); //aproximo?
    console.log("grados", maxgrados);
  },[maxgrados]);

  return (
    <div className='prc-contain'>
      <div className='elementos-juego'>
        <img src="/ruleta.png" alt="" className='prc-ruleta'
        style={{
          transform:`rotate(${maxgrados}deg)`,
          transition:'transform 5s ease-in-out'}}
        onTransitionEnd={opcionElegida}/>
        <img src="./central.png" alt="" className='prc-puntero'/>
      </div>
      <div className='contain-mensaje'>
        <span className='mensaje'>{mensaje}</span>
      </div>
      {
        tickets.length!==0?
          <div className='' ref={refComponent}>
            <div className="prc-barra">
              <div className='prc-load prc-animar' ref={refBarra}></div>
            </div>
            <button onClick={girar}>girar</button>
          </div>
        :
        <div>
          <div>No te quedan mas tiras:</div>
          <div>Has ganado {monedas.length} monedas</div>
        </div>
      }
      <div className="prc-contain-element">
        <div className='prc-contain-moneda'>
          {
            monedas.map((x,i)=>(
              <img key={i} src={x} alt="" className='prc-moneda'/>
            ))
          }
        </div>
        <div className="prc-contain-ticket">
          {
            tickets.map((x,i)=>(
              <img key={i} src={x} alt="" className='prc-ticket'/>
            ))
          }
        </div>
      </div>
    </div>
  )
}
