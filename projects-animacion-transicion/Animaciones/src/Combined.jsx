import React from "react";

export default function Combined() {
  const temblar = (e) => {
    e.target.classList.toggle("temblar");
  };

  return (
    <div className="combined">
      <hr />
      <div className="card-container">
        <div className="card">
          <div className="front">Frente</div>
          <div className="back">Reverso</div>
        </div>
      </div>
      <button onClick={(e) => temblar(e)}>Click</button>
      <div className="main-circle">
        <div className="drip"></div>
        <div className="drip"></div>
        <div className="drip"></div>
      </div>
      <div className="figura-test"></div>
    </div>
  );
}
