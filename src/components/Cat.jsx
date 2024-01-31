// import { useState, useEffect } from 'react'
import styled from "styled-components";
import '../App.css'

const Cat = (props) => {
  return (
    <>
      <CatPic src={props.url}/>
    </>
  )
}

export default Cat

const CatPic = styled.img`
  height: 250px;
  width: 250px;
  object-fit: cover;
`