import image1 from './images/rey_atanagildo.png'
import image2 from './images/rey_ataulfo.png'
import image3 from './images/rey_ervigio.png'
import imageIc from './images/rey_incognito.png'

import './StyleApp.css'
export function OnlyComponent() {
  const data = [
    {image:image1, name:'Atanagildo'},{image:image2, name:'Ataulfo'}, 
    {image:image3, name:'Ervigio'}];

  const changeImage = (e)=>{
    if(!e.target.src.includes("incognito")){
      e.target.src = imageIc;
      //console.log(e.target.parentNode);
      e.target.parentNode.style.backgroundColor="transparent";
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
    <div className="onlyComp">
      <div className="child-image">
        <img src={data[0].image} onClick={changeImage} alt="" />
        <span onClick={changeText}>{data[0].name}</span>
      </div>
      <div className="child-image">
        <img src={data[1].image} alt="" onClick={changeImage}/>
        <span onClick={changeText}>{data[1].name}</span>
      </div>
      <div className="child-image">
        <img src={data[2].image} alt="" onClick={changeImage}/>
        <span onClick={changeText}>{data[2].name}</span>
      </div>
    </div>
  )
}
