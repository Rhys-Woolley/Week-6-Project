// import { useState, useEffect } from 'react'
import { FaInfoCircle, FaCartPlus, FaCartArrowDown  } from "react-icons/fa";
import styled from "styled-components";
import '../App.css'

const CatComponent = (props) => {
  let inBasket = false;

  props.basket.map((item) => {
    if (item.id == props.cat.id) {
      inBasket = true;
      return;
    }
  })

  return (
    <CatPicHolder key={props.cat.id}>
      <CatPic src={props.cat.url}/>
      <div className="flex">
        <CatNameTag>{props.cat.name}</CatNameTag>
        <CatPrice>£{props.cat.price}</CatPrice>
      </div>
      <div className="flex right end">
        <CatButton onClick={() => props.infoFunc(props.cat)}>< FaInfoCircle /></CatButton> 

        {!inBasket ? 
        <CatButton onClick={() => props.addFunc(props.cat)}>< FaCartPlus  /></CatButton> :
        <CatButton onClick={() => props.removeFunc(props.cat)} style={{"background-color": "#752c2c", color:"white"}}>< FaCartArrowDown  /></CatButton>}
      </div>
    </CatPicHolder>
  )
}

export default CatComponent

const imageHeight = 250;
const imageWidth = 350;

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
  align-self: end;
`

const CatPic = styled.img`
  height: ${imageHeight}px;
  width: ${imageWidth}px;
  object-fit: cover;
  transition: 0.3s ease-out;
  z-index: 0;
  scale: 1.05; // Should be enough to hide the borders some of the images have.
  position:absolute;
  z-index: -1;
`

const CatPicHolder = styled.div`
  height: ${imageHeight}px;
  width: ${imageWidth}px;
  overflow: hidden;
  contain: paint;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  flex-direction: column;

  &:hover img {
    scale: 1.2;
  }

  &:hover button {
    visibility: visible;
    opacity: 1;
  }
`

const CatNameTag = styled.p`
  user-select: none;
  color: black;  
  font-weight: 400;
  font-size: 24pt;
  position:relative;
  margin: 16px 0;
  background-color: white;
  padding: 4px 8px;  
  align-self: baseline;
  /* filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 2px black); */
`

const CatPrice = styled.p`
  margin: 16px 0;
  user-select: none;
  color: white;
  background-color: #752c2c;
  padding: 4px 8px;
  align-self: start;
`