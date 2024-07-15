import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import style from './NavBar.module.css'





export default function NavBar() {

  const [isOpen, setIsOpen] = useState(false);
  return <>



<header className="bg-gray-100 fixed top-0 z-50 w-full">
  <div className="mx-auto flex justify-between h-16 w-full items-center gap-8 px-4 sm:px-6 lg:px-8">
    <div className='flex flex-row '>
    <Link className="block text-gray-950 text-xl xl:text-2xl font-bold me-5"  to="">
   
     
  
    <i className="fa-solid fa-sack-dollar text-blue-500"></i>
    Transactions
    </Link>

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Global" className="hidden lg:block">
        <ul className="flex items-center gap-6 font-semibold">
        
            <li>
          <NavLink className='p-2 text-gray-500 linkStyle' to="">Home</NavLink>
          </li>
            <li>
          <NavLink className='p-2 text-gray-500 linkStyle' to="addcustomer">Add Customer</NavLink>
          </li>
            <li>
          <NavLink className='p-2 text-gray-500 linkStyle' to="alltrans">All Transactions</NavLink>
          </li>
        
    


        
        </ul>
      </nav>

    
    </div>




    </div>

    <div className="flex items-center gap-4">
      
        
        <button
        onClick={() => setIsOpen(!isOpen)}
          className="block rounded bg-gray-300  p-2.5 text-gray-600 transition hover:text-gray-600/75 lg:hidden"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

  </div>

  <div className={`${isOpen ? 'max-h-screen' : 'max-h-0'} lg:hidden overflow-hidden transition-max-height duration-700 ease-in-out`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col ">
       
         <NavLink className='p-2 linkStyle' to="">Home</NavLink>
         <NavLink className='p-2 linkStyle' to="addcustomer">Add Customer</NavLink>
        
      
        </div>
      </div>


</header>

  </>
}
