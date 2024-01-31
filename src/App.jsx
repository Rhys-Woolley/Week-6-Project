import { useState, useEffect } from 'react'
import './App.css'
import Cat from './components/Cat';

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
      <div className="catComponents">
      {cats.map((cat) => {
        return <Cat key={cat.id} url={cat.url} />
      })}
      </div>
      <div id="basket"></div>
    </>
  )
}

export default App
