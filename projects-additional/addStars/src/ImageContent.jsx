import './StyleApp.css'
import imageIc from './images/rey_incognito.png'

export function ImageContent({url, name}){
  const changeImage = (e)=>{
    if(!e.target.src.includes("incognito")){
      e.target.src = imageIc;
    }else{
      e.target.src = "";
    }
  };

  const changeText = (e)=>{
    if(!e.target.textContent.includes("Visto")){
      e.target.textContent = "Visto";
    }else{e.target.textContent = "";}
  };
  return (
    <div className="back-image">
      <img src={url} alt="" onClick={changeImage}/>
      <span onClick={changeText}>{name}</span>
    </div>
  );
}