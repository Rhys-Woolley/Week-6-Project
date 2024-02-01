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
  const [catData, setCatData] = useState([]);
  const [catList, setCatList] = useState([]);
  const [basketContents, setBasketContents] = useState([]);
  const [basketVisible, setBasketVisible] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
      const data = await response.json();
      
      setCatData(data);
    }
    
    fetchCats();
  }, []);

  useEffect(() => {
    const tempList = [];

    catData.map((item) => {
      const cat = new Cat(item.id, item.url, faker.person.firstName(), Math.random() > 0.5 ? "M" : "F")
      
      tempList.push(cat);
    })

    setCatList(tempList); 
  }, [catData]);

  const addToBasket = (cat) => {

  }

  return (
    <>
      <div id="topBar"></div>
      <div className="catComponents">
        {catList.map((cat) => {
          return <CatComponent key={cat.id} cat={cat} addFunc={addToBasket}/>
        })}
      </div>
      <div id="basket"></div>
    </>
  )
}

export default App
