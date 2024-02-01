// import { useState, useEffect } from 'react'
import { FaInfoCircle, FaCartPlus  } from "react-icons/fa";
import styled from "styled-components";
import '../App.css'

const CatComponent = (props) => {
  return (
    <CatPicHolder key={props.cat.id}>
      <CatPic src={props.cat.url}/>
      <CatNameTag>{props.cat.name}</CatNameTag>
      <div className="flex right">
        <CatButton onClick={() => props.infoFunc(props.cat)}>< FaInfoCircle /></CatButton>
        <CatButton onClick={() => props.addFunc(props.cat)}>< FaCartPlus  /></CatButton>
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
  align-items: end;

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
  color: white;  
  font-weight: 400;
  font-size: 24pt;
  position:relative;
  margin: 16px 20px;
  filter: drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 1px black) drop-shadow(0 0 2px black)
`