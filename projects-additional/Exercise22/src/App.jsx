import { useState } from 'react'
import './App.css'
import Buttons from './Buttons'
import ListCards from './ListCards'
import List from './Generics/List';
import Layout from './Generics/Layout';
import Button from './Generics/Button';
import Card from './Generics/Card';
import Form from './Generics/Form';

function App() {
  const elements = ["washing dishes", "water plants", "clean the room", "food", "do homework"];

  return (
    <>
      {/* <Buttons/> */} 
      {/* <ListCards/> */}
      {/* <List data={elements}/> */}
      {/* <Layout dataHeader={"Esta es la cabezera"} dataFooter={"Este es el footer"}>
        <List data={elements}/>
        <Card title={"Sobre React"}>React es una libreria de JS desarrollada por Meta en el 2013</Card>
        <Button variant={"primary"} text={"Smile"} onClick={()=>{console.log("React 2025")}}/>
      </Layout> */}
      <Form/>
    </>
  )
}

export default App
