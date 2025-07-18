import React from 'react'
import tasteImg from "../assets/Farmart.png"
import LoadPage from '../components/LoadPage'

const Loadpageimg = () => {
  return (
    <div className='loaddis'>
        <LoadPage />
        <img src={tasteImg} alt="Loadpage image" />
    </div>
  )
}

export default Loadpageimg