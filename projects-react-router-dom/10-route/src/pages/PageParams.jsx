import { useParams } from "react-router-dom";

export function Page4(){
  const value = useParams();
  return(
    <>
    <p>{value.word}</p>
    </>
  )
}