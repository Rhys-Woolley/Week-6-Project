import { FaCartPlus, FaCartArrowDown  } from "react-icons/fa";
import styled from "styled-components";

const CatInfoComponent = (props) => {
  const cat = props.cat;
  let inBasket = false;

  if (cat == null) return;

  props.basket.map((item) => {    
    console.log(item.id, cat.id);
    if (item.id == cat.id) {
      inBasket = true;
      return;
    }
  })

  return (
    <>
      <div className={"basketBG " + (props.visible ? "" : "hidden")}
            onClick={() => props.setVisible(false)}></div>

      <div className={"basketHolder basketBG " + (props.visible ? "" : "hidden")}
          onClick={() => props.setVisible(false)}></div>  

      <div className={"infoBox " + (props.visible ? "" : "hidden")}>
        
        <div className="innerInfoBox flex">
          <img src={cat.url} />
          <div className="catInfo">
            <h1>{cat.name}</h1>
            <h2>£{cat.price}</h2>
            <p>{cat.description}</p>
            {!inBasket ? 
              <CatButton onClick={() => props.addFunc(props.cat)}>< FaCartPlus  /></CatButton> :
              <CatButton onClick={() => props.removeFunc(props.cat)} style={{"backgroundColor": "#752c2c", color:"white"}}>< FaCartArrowDown  /></CatButton>}
          </div>
        </div>
      </div>
    </>
  )
}

export default CatInfoComponent

const CatButton = styled.button`
  margin: 14px 6px;
  justify-self: right;
  font-size: 24pt;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  transition: 0.2s;
`