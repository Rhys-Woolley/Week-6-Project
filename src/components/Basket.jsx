import { FaShoppingCart } from "react-icons/fa"
import styled from "styled-components";

const BasketComponent = (props) => {
  const contents = props.contents;

  return (
    <>
      <div id="basketHolder" 
          className={props.visible ? "" : "hidden"}
          onClick={() => props.setVisible(false)}></div>

      <div id="basket" 
          className={props.visible ? "" : "hidden"}>
        <h1>Basket < FaShoppingCart /></h1>        
        {contents.map((item, index) => {
          return <CatComponent key={index} cat={item} basketMode="true"/>
        })}

      </div>
    </>
  )
}

const CatComponent = (props) => {
  return (
    <BasketItem key={props.cat.id}>
      <CatPic src={props.cat.url}/>
      <CatNameTag>{props.cat.name}</CatNameTag>
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
  opacity: 0;
  visibility: hidden;
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