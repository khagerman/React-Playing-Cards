import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const TimerToDraw = () => {
  let [deckLeft, setDeckLeft] = useState(52);
  const [img, setImg] = useState("");
  const [deckID, setDeckID] = useState(null);
  const [clicked, setClicked] = useState(false);
  const timerId = useRef(null);
  // TODO why timer go right awaY? hide button
  useEffect(() => {
    async function shuffle() {
      let deck = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/"
      );
      setDeckID(deck.data.deck_id);
    }
    shuffle();
  }, [setDeckID]);
  async function draw() {
    try {
      let res = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
      );

      console.log(deckLeft);

      if (deckLeft === 0) {
        setClicked(false);
        console.log(clicked);
        alert("Error: no cards remaining!");
      }
      setDeckLeft(deckLeft--);
      setImg(res.data.cards[0].image);
      //   setDeckLeft(deckLeft - 1);
      //   if (deckLeft < 1) {
      //     alert("Error: no cards remaining!");
      //     // setDeckLeft(52);
      //     // setImg("");
      //     // setDeckID(null);

      //     window.location.reload();
      //   }
    } catch (e) {
      console.log(e);
    }
  }

  const toggleClicked = () => {
    setClicked(true);
  };

  useEffect(() => {
    if (clicked && !timerId.current) {
      timerId.current = setInterval(async () => {
        await draw();
      }, 1000);
    }
    return () => {
      clearInterval(timerId.current);
      timerId.current = null;
      console.log("clean!");
    };

    // clearInterval(timerId.current);
    // timerId.current = null;

    // alert("Error: no cards remaining!");

    // window.location.reload();
  }, [clicked]);

  return (
    <div>
      <div className="Card-div">
        {" "}
        <img src={img} />
      </div>
      <div style={{ display: clicked === false ? "block" : "none" }}>
        <button onClick={toggleClicked}>Start Auto Draw!</button>
      </div>
    </div>
  );
};

export default TimerToDraw;
