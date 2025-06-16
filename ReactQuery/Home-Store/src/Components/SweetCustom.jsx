import Swal from "sweetalert2";

/**
 * Muestra un modal de confirmacion usando la libreria SweetAlert 2
 * @param {*} title Mensaje que se mostrara
 * @param {*} icon Tipo de icono que se mostrara: 
 * question, success, error, warning, info (Por defecto es question)
 * @returns Un booleano donde el usuario confirma o cancela la accion que realizara el modal
 */
export const ask = async(title, icon="question")=>{
  const resp = await Swal.fire({
    title: title,
    icon: icon,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
  });
  return resp.isConfirmed;
}

/**
 * Muestra una notificacion segun la accion con SweetAlert 2
 * @param {*} message Mensaje que se mostrara en la notificacion
 * @param {*} type Tipo de notificacion que se mostrara: INFO, WARNING, SUCCESS, ERROR. Por defecto es INFO
 * @param {*} duration Duracion que se mostrara la notificacion. 2000 msl por defecto
 * @param {*} url (Opcional) Cuando desaparezca la notificacion, se rederigir a la url que se especifica
 */
export const showToast =(message = "", type="INFO", duration=2000, url=null)=>{
  const bgColor = {
    'INFO':"#00b4d8",
    'WARNING':"#ffb703",
    'SUCCESS':"#70e000",
    'ERROR':"#d90429",
  };

  Swal.fire({
    toast:true,
    icon:type.toLowerCase(),
    iconColor: 'white',
    color: 'white',
    text: message,
    timer: duration,
    timerProgressBar: true,
    position: 'top-end',
    showConfirmButton: false,
    background:bgColor[type]
  }).then(()=>{
    if(url!=null){
      window.location.href= url;
    }
  });
}
