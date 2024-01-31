import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [cats, setCats] = useState([]);
  const [cats2, setCats2] = useState([0,1,2,3,4,5,6,7,8]);

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
      <p>Hello</p>
      {cats.map((cat) => {
        return (
          <img key={cat.id} src={cat.url} />
        )
      })}
    </>
  )
}

export default App
