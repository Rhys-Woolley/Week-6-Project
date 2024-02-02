import { useState, useEffect } from 'react'
import CatComponent from './components/Cat';
import { faker } from '@faker-js/faker';
import './App.css'
import BasketComponent from './components/Basket';
import CatInfoComponent from './components/CatInfo';
import styled from 'styled-components';

// For the eyecatch element around the basket.
const pingSize = 400;

class Cat {
  constructor (id, url, name, sex) {
      this.id = id;
      this.url = url;

      this.name = name;
      this.sex = sex;

      this.price = faker.number.int({min: 40, max: 300});
      this.adjective = faker.word.adjective();
      this.noun = faker.word.noun();

      // Generates random descriptions for each cat using faker and some random phrases.
      let flourishes = ["nothing more than", "anything to do with", "all things", "to see", "whatever seems like"]
      let flourish = flourishes[Math.floor(Math.random()*flourishes.length )];

      let moods = ["likes", "loves", "loathes", "enjoys", "is indifferent to", "wants", "is scared of", "dreads", "fancies", "rejects", "relishes in", "demands"]
      let mood = moods[Math.floor(Math.random()*moods.length)];

      // Switches between "a" and "an" as appropriate.
      let starterWord = ["a","e","i","o","u"].includes(this.adjective[0]) ? "An" : "A";

      this.description = `${starterWord} ${this.adjective} cat who ${mood} ${flourish} ${this.noun}.`

      // Delete this after testing.
      console.log(this.description);
  }
}

function App() {
  const [rawCatData, setRawCatData] = useState([]);
  const [catObjects, setCatObjects] = useState([]);
  const [basketContents, setBasketContents] = useState([]);
  const [basketVisible, setBasketVisible] = useState(false);
  const [infoboxObject, setInfoboxObject] = useState(null);
  const [infoboxVisible, setinfoboxVisible] = useState(false);

  useEffect(() => {
    setRawCatData([]); // Prevent an infinite number of cats loading whenever the page rerenders.

    const fetchCats = async () => {
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
      const data = await response.json();
      // Make a second request to cover any gaps left by the items we're going to remove. 
      const response2 = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
      const data2 = await response2.json();

      // Filters out any gifs.
      const tempData = [...data, ...data2].filter((item) => {
        if (!item.url.endsWith(".gif")) return item;
        else console.log("removed", item.url);
      });

      // Only display the first 15. Unless there are more than 5 gifs across both requests
      // this should mean there aren't any gaps. Shouldn't break anything if there are more
      // than 5, but it should keep things more consistent overall.
      setRawCatData(tempData.slice(0, 15));
    }
    
    fetchCats();
  }, []);


  useEffect(() => {
    const tempList = [];

    rawCatData.map((item) => {
      const cat = new Cat(item.id, item.url, faker.person.firstName(), Math.random() > 0.5 ? "M" : "F")
      
      tempList.push(cat);
    })

    setCatObjects(tempList); 
  }, [rawCatData]);

  // useEffect(() => {
  //   setinfoboxVisible(true);
  //   console.log(infoboxObject);
  // }, [infoboxObject]);


  const addToBasket = (cat) => {
    setBasketContents([...basketContents, cat]);

    const basketBtn = document.getElementById("basketBtn");
    const ping = document.getElementById("ping");

    const pingLeft  = (basketBtn.getBoundingClientRect().x + basketBtn.getBoundingClientRect().width / 2) - pingSize / 2;
    const pingTop   = (basketBtn.getBoundingClientRect().y + basketBtn.getBoundingClientRect().height / 2) - pingSize / 2;

    
    ping.style.left = pingLeft + "px";
    ping.style.top = pingTop + "px";
    
    ping.classList.add("pinging");
  }


  const removeFromBasket = (cat) => {    
    let tempList = [...basketContents].filter((item) => item.id != cat.id);
    console.log(cat.id, tempList);
    setBasketContents([...tempList]);
  }


  // Display info modular.
  const showInfo = (cat) => {
    setInfoboxObject(cat);
    setinfoboxVisible(true);
  }

  // Resets the eyecatch once it's finished playing.
  const resetPing = () => {    
    document.getElementById("ping").classList.remove("pinging");
  }
  

  return (
    <>
      <div id="topBar">
        <div className="basketBtnHolder">
          <button id="basketBtn" onClick={() => {setBasketVisible(true)}}>Basket</button>
        </div>
        <Ping id="ping" onTransitionEnd={resetPing}/>
      </div>
      <div className="catComponents">
        {catObjects.map((cat, index) => {
          return <CatComponent key={index} cat={cat} addFunc={addToBasket} infoFunc={showInfo} removeFunc={removeFromBasket} basket={basketContents}/> 
        })}
      </div>
      
      {infoboxVisible && <CatInfoComponent cat={infoboxObject} addFunc={addToBasket} visible={infoboxVisible} setVisible={setinfoboxVisible}/>}
      <BasketComponent contents={basketContents} visible={basketVisible} setVisible={setBasketVisible} removeFunc={removeFromBasket}/>
    </>
  )
}

export default App

// Eyecatch element.
const Ping = styled.div`
  pointer-events: none;
  height:${pingSize}px;
  width: ${pingSize}px;
  border-radius: ${pingSize}px;
  background-color: grey;
  position:absolute;
  top: ${-pingSize/2}px;
  left: ${-pingSize/2}px;
  z-index: -1;
  background: radial-gradient(circle, #752c2c00 20%, #752c2c 50%, #752c2c00 100%);
  transition: scale 0.3s !important;;
  opacity: 0;
  scale: 1;

  &.pinging {
    opacity: 1;
    z-index: 5;
    scale: 0.001;
  }
`
