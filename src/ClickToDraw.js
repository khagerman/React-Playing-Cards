import React, { useState, useEffect } from "react";
import axios from "axios";

const ClickToDraw = () => {
  const [deckLeft, setDeckLeft] = useState(52);
  const [img, setImg] = useState("");
  const [deckID, setDeckID] = useState(null);
  useEffect(() => {
    async function shuffle() {
      let deck = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/"
      );
      setDeckID(deck.data.deck_id);
    }
    shuffle();
  }, []);
  async function draw() {
    try {
      let res = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
      );

      setImg(res.data.cards[0].image);

      setDeckLeft(deckLeft - 1);

      if (deckLeft === 1) {
        alert("Error: no cards remaining!");
        // setDeckLeft(52);
        // setImg("");
        // setDeckID(null);
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <div className="Card-div">
        {" "}
        <img src={img} />
      </div>
      <button onClick={draw}>Draw A Card</button>
    </div>
  );
};

export default ClickToDraw;
