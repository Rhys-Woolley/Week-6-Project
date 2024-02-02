import { FaShoppingCart } from "react-icons/fa"
import { ImCross } from "react-icons/im";
import styled from "styled-components";

const BasketComponent = (props) => {
  const contents = props.contents;
  let totalCost = 0
  contents.map((item) => {totalCost += item.price});

  return (
    <>
      <div className={"basketBG " + (props.visible ? "" : "hidden")}
            onClick={() => props.setVisible(false)}></div>

      <div id="basketHolder" 
          className={"basketBG " + (props.visible ? "" : "hidden")}
          onClick={() => props.setVisible(false)}></div>      

      <div id="basket" 
          className={props.visible ? "" : "hidden"}>
        <h1>Basket < FaShoppingCart /></h1>        
        {contents.map((item, index) => {
          return <CatComponent key={index} cat={item} basketMode="true" removeFunc={props.removeFunc}/>
        })}
        
        <p>Total Cost: £{totalCost}</p>

      </div>
    </>
  )
}

const CatComponent = (props) => {
  return (
    <BasketItem key={props.cat.id}>
      <CatButton onClick={() => props.removeFunc(props.cat)}>< ImCross /></CatButton>
      <div className="basketImageHolder">
        <CatPic src={props.cat.url}/>
      </div>
      <div className="flexColumn">
        <CatNameTag>{props.cat.name}</CatNameTag>
        <CatNameTag>£{props.cat.price}</CatNameTag>
      </div>
    </BasketItem>    
  )
}
  
export default BasketComponent

const imageHeight = 80;
const imageWidth = 80;

const CatButton = styled.button`
  margin: 14px 6px;
  justify-self: right;
  font-size: 24pt;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  transition: 0.2s;
`

const CatPic = styled.img`
  height: ${imageHeight}px;
  width: ${imageWidth}px;
  object-fit: cover;
  transition: 0.3s ease-out;
  z-index: 0;
  margin-right: 10px;
`

const BasketItem = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;
`

const CatNameTag = styled.p`
  margin: 0;
`