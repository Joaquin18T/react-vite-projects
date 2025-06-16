import React,{ useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement("#root");//inicializar el modal
/**
 * Mostrar un modal
 * @param {Object} param0 Objeto con props ya definidos (modalIsOpen:estado del modal)-(setModalIsOpen:actualizar el estado del
 * modal)-(width:ancho del modal)-(children:contenido del modal)  
 * @returns renderiza un modal
 */
export default function ModalC({modalIsOpen, setModalIsOpen, width, children}) {
  //estilos del modal
  const customStyles={
    overlay:{backgroundColor: 'rgba(0, 0, 0, 0.5)'},
    content:{
      backgroundColor:"#222",
      width:`${width}`,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
  };

  return (
    <div className='contain-modal'>
      {/* <button onClick={()=>setModalIsOpen(true)}>Abrir Modal</button> */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={()=>setModalIsOpen(false)}
        contentLabel="Example Modal"
        style={customStyles}>
        {children}
        {/* <button onClick={()=>setModalIsOpen(false)}>Cerrar Modal</button> */}
      </Modal>
    </div>
  )
}
