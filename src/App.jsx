import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
      const data = await response.json();

      
      setCats(data);
    }
    
    fetchFilms();    
  }, []);

  useEffect(() => {
    console.log(cats);
  }, [cats]);

  return (
    <>
      <div id="topBar"></div>
      {cats.map((cat) => {
        return (
          <img key={cat.id} src={cat.url} />
        )
      })}
      <div id="basket"></div>
    </>
  )
}

export default App
