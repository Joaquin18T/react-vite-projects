import React from 'react'
import InputField from './InputField'

export default function Form() {
  return (
    <>
      <form>
        <InputField forId={"user"}>Username:</InputField>
        <InputField forId={"email"} typeInput='email'>Email: </InputField>
        <InputField forId={"pass"} typeInput='password'>Password:</InputField>
        <button>Enviar</button>
      </form>
    </>
  )
}
