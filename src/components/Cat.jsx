// import { useState, useEffect } from 'react'
import styled from "styled-components";
import '../App.css'

const CatComponent = (props) => {
  return (
    <>
      <CatPicHolder>
        <CatPic src={props.cat.url}/>
        <CatNameTag>{props.cat.name}</CatNameTag>
      </CatPicHolder>
    </>
  )
}

export default CatComponent

const imageHeight = 250;
const imageWidth = 350;

const CatPic = styled.img`
  height: ${imageHeight}px;
  width: ${imageWidth}px;
  object-fit: cover;
  transition: 0.3s ease-out;
  z-index: 0;
  scale: 1.05; // Should be enough to hide the borders some of the images have.
`

const CatPicHolder = styled.div`
  height: ${imageHeight}px;
  width: ${imageWidth}px;
  overflow: hidden;
  border-radius: 5px;
  margin: 10px;

  &:hover img {
    scale: 1.2;
  }
`

const CatNameTag = styled.p`
  user-select: none;
  color: white;  
  font-weight: 400;
  font-size: 24pt;
  position:relative;
  top: -56px;
  margin: 0px 14px;
  filter: drop-shadow(0 0 2px black) drop-shadow(0 0 2px black) drop-shadow(0 0 2px black) drop-shadow(0 0 2px black) drop-shadow(0 0 2px black)
`