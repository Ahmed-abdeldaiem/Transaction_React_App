import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, Treemap, XAxis, YAxis } from 'recharts'
import { TransactionContext } from '../../Context/TransactionContext'
import { UserContext } from '../../Context/UserContext'
import Loader from '../Loader/Loader'
import style from './AllTransactions.module.css'





export default function AllTransactions() {

  let {getAllUsers,getCustomerById} =useContext(UserContext)
  let {getAllTrans} =useContext(TransactionContext)
  const [Loading, setLoading] = useState(false)
  const [Alldata, setAllData] = useState([])
  const [names, setNames] = useState([])

useEffect(() => {
  
  getAll()
  getNames()
  
}, [])


async function getAll() {
  setLoading(true)
 let all = await getAllTrans()
  console.log(all.data);

  setAllData(all.data)
  setLoading(false)
}


async function getNames(){
  let data= await getAllUsers()
  console.log(data.data);
  setNames(data.data)
}


  return <>
  
  
  {Loading ? <Loader/> :null}

  <h1 className='text-center text-blue-500 font-semibold text-3xl my-5'>All Transactions</h1>

  <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
  <table className="w-full text-lg text-center rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400 text-center">
      <tr>
        <th scope="col" className="px-6 py-3">
        Customer name
        </th>
        <th scope="col" className="px-6 py-3">
         Transaction ID
        </th>
        <th scope="col" className="px-6 py-3">
         Date
        </th>
        <th scope="col" className="px-6 py-3">
          Amount
        </th>
       
      </tr>
    </thead>
    <tbody>

    {
    Alldata.length==0 ?null: Alldata?.map((transaction)=>{
    
      return(

        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 " key={transaction.id}>
        <th scope="row" className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <span className='ps-10'><i className="fa-solid fa-user-large  text-xl  text-blue-600"></i> {names.map((name)=>{
          if (name.id==transaction.customer_id) {
            return name.name
          }
        })}</span>
        </th>
        <td className="px-6 py-4">
        {transaction.id}
        </td>
        <td className="px-6 py-4">
       {transaction.date}
        
        </td>
        <td className="px-6 py-4">
       {transaction.amount}
        
        </td>
      
       
      </tr>
      )
    
    })
  }


    

    </tbody>
  
  </table>

</div>

<h2 className='text-center text-blue-500 font-semibold text-3xl my-3'>Explains Charts</h2>

<div className="row bg-white border border-blue-200 rounded-lg shadow my-6">
  <div className='w-full flex flex-wrap flex-col md:flex-row justify-center'>
  



    <div className='w-full '>
      <h3 className='text-center text-blue-500 font-semibold text-md my-3'>Amount with Date</h3>
    <div style={{ width: '90%', height: 350 }}>
      <ResponsiveContainer>
        <LineChart data={Alldata}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    </div>   


    <div className='w-full '>
    <h3 className='text-center text-blue-500 font-semibold text-md my-3'>Amount with Customers IDs</h3>
    <div style={{ width: '90%', height: 350 }}>
      <ResponsiveContainer>
        <BarChart data={Alldata}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="customer_id" />
          <YAxis />
          <Tooltip />
          <Legend />
         
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>  










  
  

  





  
 
 


    </div>

  </div>

  
  </>
}
