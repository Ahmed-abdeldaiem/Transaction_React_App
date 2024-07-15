import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './components/LayOut/LayOut'
import Home from './components/Home/Home'
import UserContextProvider from './Context/UserContext'
import TransactionContextProvider from './Context/TransactionContext'
import AddCustomer from './components/AddCustomer/AddCustomer'
import CustomerDetails from './components/CustomerDetails/CustomerDetails'
import AddTtansaction from './components/AddTtansaction/AddTtansaction'
import AllTransactions from './components/AllTransactions/AllTransactions'

function App() {

  

  let route = createBrowserRouter([
    {path:'',element:<LayOut/>,children:[
      {index:true ,element:<Home/>},
     
      {path:'addcustomer' ,element:<AddCustomer/>},
      {path:'customerdetails/:id' ,element:<CustomerDetails/>},
      {path:'addtransaction/:id' ,element:<AddTtansaction/>},
      {path:'alltrans' ,element:<AllTransactions/>},
    ]}
  ])

  

  return (
    <>
    <TransactionContextProvider>

  
    <UserContextProvider>
    <RouterProvider router={route}>

</RouterProvider>

    </UserContextProvider>
    </TransactionContextProvider>
  
    </>
  )
}

export default App
