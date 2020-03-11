import React, { useState, useEffect } from "react";

export default function Meme() {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [randomImg, setRandomImg] = useState("http://i.imgflip.com/1bij.jpg");

  const [allMemeImgs, setAllMemeImgs] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const { memes } = response.data;
        setAllMemeImgs(memes);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const randNum = Math.floor(Math.random() * allMemeImgs.length);

    const randMemeImg = allMemeImgs[randNum].url;
    setRandomImg(randMemeImg);
  }

  return (
    <div>
      <form className="meme-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="setTopText"
          placeholder="Top Text"
          value={topText}
          onChange={event => {
            setTopText(event.target.value);
          }}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={event => {
            setBottomText(event.target.value);
          }}
        />

        <button>Gen</button>
      </form>
      <div className="meme">
        <img src={randomImg} alt="" />
        <h2 className="top">{topText}</h2>
        <h2 className="bottom">{bottomText}</h2>
      </div>
    </div>
  );
}
