import {useQuery} from '@tanstack/react-query'

const getRandomNumberFromApi = async()=>{
  const res = await fetch("https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new");
  const numberString = await res.text();

  //throw new Error("help me");
  return parseInt(numberString);
}

export default function useRandom() {
  const query = useQuery(
    ['randomNumber'],
    getRandomNumberFromApi
  ); //minimo necesita un argumento

  return (query)
}
