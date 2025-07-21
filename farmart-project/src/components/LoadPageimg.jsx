import React from 'react'
import tasteImg from "../assets/Farmart.png"
import LoadPage from '../components/LoadPage'

const Loadpageimg = () => {
  return (
    <div className='loaddis'>        
        <img src={tasteImg} alt="Loadpage image" />
        <LoadPage />
    </div>
  )
}

export default Loadpageimg