import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'
import style from './LayOut.module.css'





export default function LayOut() {

const [counter, setcounter] = useState(0)

  return <>
  
  <NavBar/>
  <div className="container mt-20 min-h-96">

 <Outlet/>

  </div>
  <Footer/>
 
 


  </>
}
