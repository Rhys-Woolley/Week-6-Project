import { useState, useEffect } from 'react'
import './App.css'
import CatComponent from './components/Cat';

class Cat {
  constructor (id, url) {
      this.id = id;
      this.url = url;
  }
}

function App() {
  const [response, setResponse] = useState([]);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
      const data = await response.json();
      
      setResponse(data);
    }
    
    fetchCats();
  }, []);

  useEffect(() => {
    response.map((item) => {    
      setCats(cats + [new Cat(item.id, item.url)]);
    })
  }, [response, cats]);
  

  return (
    <>
      <div id="topBar"></div>
      <div className="catComponents">
      {response.map((cat) => {
        return <CatComponent key={cat.id} url={cat.url} />
      })}
      </div>
      <div id="basket"></div>
    </>
  )
}

export default App
