// import { useState, useEffect } from 'react'
import styled from "styled-components";
import '../App.css'

const Cat = (props) => {
  return (
    <>
      <CatPicHolder>
        <CatPic src={props.url}/>
      </CatPicHolder>
    </>
  )
}

export default Cat

const imageHeight = 250;
const imageWidth = 350;

const CatPic = styled.img`
  height: ${imageHeight}px;
  width: ${imageWidth}px;
  object-fit: cover;
  transition: 0.3s ease-out;
  z-index: 0;

  &:hover {
    scale: 1.2;
  }
`

const CatPicHolder = styled.div`
  height: ${imageHeight}px;
  width: ${imageWidth}px;
  overflow: hidden;
`