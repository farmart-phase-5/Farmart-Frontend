import React from 'react'
import tasteImg from "../assets/Farmart.png"
import LoadPage from '../components/LoadPage'

const Loadpageimg = () => {
  return (
    <div className='loadpage-image-wrapper'>        
        <img src={tasteImg} alt="Loadpage image" className='loadpage-image'/>
        <LoadPage />
    </div>
  )
}

export default Loadpageimg