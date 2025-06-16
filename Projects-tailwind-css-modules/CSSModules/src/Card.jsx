import style from './modulesCSS/card.module.css';

export default function Card() {
  const {contain_card,card_img, contain_data} = style;
  return (
    <div className={contain_card}>
      <img src="https://i.pinimg.com/736x/f8/09/a4/f809a4b31b70b9e9831d00c11febd62d.jpg" className={card_img}/>
      <div className={contain_data}>
        <span>Personaje de Anime</span>
        <span>15$</span>
      </div>
    </div>
  )
}
