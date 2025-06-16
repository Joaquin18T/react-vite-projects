
import FormProd from "./FormProd";

/**
 * Componente que actualiza los datos de un producto
 * @param {Object} param0 Objeto con props ya definidas: (idproducto:id del producto a actualizar sus datos) - (
 * refresh:Funcion que refresca los datos al actualizar) - (closeModal: Funcion que cierra el modal) 
 * @returns Un formulario con datos del producto elegido
 */
export default function UpdateProd({idproducto, refresh, closeModal}) {

  return (
    <div className="contain-form-update">
      <FormProd defaultV={{nombre:'', stock:'', precio:'', categoria:'', unidad_medida:''}} typeForm={2}
      idproducto={idproducto} httpMethod="PUT" filterProduct={refresh} closeModal={closeModal}
      nameClasses={{contain_fields:"mdl-contain-fields", contain_inputs:"mdl-contain-input", 
        contain_buttons:"mdl-contain-buttons", contain_selects:"mdl-contain-select"}}
      />
    </div>
  )
}
