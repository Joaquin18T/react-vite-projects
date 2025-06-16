import style from './modulesCSS/form.module.css';
export default function Form() {
  const {contain_card, field_form, btn_form} = style;
  return (
    <div>
      <form className={contain_card}>
        <input className={field_form}/>
        <button type='button' className={btn_form}>Send</button>
      </form>
    </div>
  )
}
