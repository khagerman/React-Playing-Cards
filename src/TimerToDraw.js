import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const TimerToDraw = () => {
  const [deckLeft, setDeckLeft] = useState(52);
  const [img, setImg] = useState("");
  const [deckID, setDeckID] = useState(null);
  const [clicked, setClicked] = useState(false);
  const timerId = useRef(null);
  // TODO rewatch videos why alery go right awaY? hide button
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
    console.log("clicked");
  };

  useEffect(() => {
    timerId.current = setInterval(async () => {
      await draw();
    }, 1000);
    return () => {
      clearInterval(timerId.current);
      timerId.current = null;
      if (deckLeft === 1) {
        alert("Error: no cards remaining!");

        window.location.reload();
      }
    };
  }, [clicked]);

  return (
    <div>
      <div className="Card-div">
        {" "}
        <img src={img} />
      </div>
      <button
        style={clicked === false ? { diplay: "inherit" } : { diplay: "none" }}
        onClick={toggleClicked}
      >
        Start Auto Draw!
      </button>
    </div>
  );
};

export default TimerToDraw;
