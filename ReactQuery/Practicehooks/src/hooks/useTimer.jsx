
export default function useTimer(setAction, time=1000) {
  const timer = setTimeout(()=>{
    setAction(false);
  },time);
  return (timer);
}
