/**
 * Funcion usada para mostrar un texto durante un tiempo determinado
 * @param {*} setAction funcion del useState que actualice el valor del estado (booleano)
 * @param {*} time tiempo en que se mostrara el texto (mls) (por defecto es de 1000=1seg)
 * @returns Un setTimeout para que puedas eliminarlo si se desmonta el componente en donde se usa
 */
export default function useTimer(setAction, time=1000) {
  const timer = setTimeout(()=>{
    setAction(false);
  },time);
  return (timer);
}
