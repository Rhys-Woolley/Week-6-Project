import { useState, useEffect } from 'react'
import CatComponent from './components/Cat';
import { faker } from '@faker-js/faker';
import './App.css'

class Cat {
  constructor (id, url, name, sex) {
      this.id = id;
      this.url = url;

      this.name = name;
      this.sex = sex;
  }
}

function App() {
  const [rawCatData, setRawCatData] = useState([]);
  const [catObjects, setCatObjects] = useState([]);
  const [basketContents, setBasketContents] = useState([]);
  const [basketVisible, setBasketVisible] = useState([]);

  useEffect(() => {
    setRawCatData([]); // Prevent loading an infinite number of cats whenever the page rerenders.

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

  const addToBasket = (cat) => {

  }

  return (
    <>
      <div id="topBar"></div>
      <div className="catComponents">
        {catObjects.map((cat, index) => {
          return <CatComponent key={index} cat={cat} addFunc={addToBasket}/> 
        })}
      </div>
      <div id="basket"></div>
    </>
  )
}

export default App
