import React, { useState } from 'react'
import style from './Loader.module.css'
import FadeLoader from 'react-spinners/FadeLoader'
import { PulseLoader } from 'react-spinners'




export default function Loader() {

const [counter, setcounter] = useState(0)

  return <>
  
  <div className="bg-gray-400 bg-opacity-40 fixed inset-0 z-30 flex justify-center items-center ">
          <PulseLoader color={"#0011ff"} loading={true} />
          
        </div>
  </>
}
