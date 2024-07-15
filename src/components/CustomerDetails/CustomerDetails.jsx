import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, LineChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { TransactionContext } from '../../Context/TransactionContext'
import { UserContext } from '../../Context/UserContext'
import Loader from '../Loader/Loader'
import style from './CustomerDetails.module.css'





export default function CustomerDetails() {

  const [Loading, setLoading] = useState(false)
  const [customerTrans, setCustomerTrans] = useState([])
  const [customer, setCustomer] = useState({})
  const [totalTrans, setTotalTrans] = useState([])
  let {getAllUsers,getTransForSpecifcUser,getCustomerById} =useContext(UserContext)
  let {getAllTrans,getSpecificTrans,getAllSpecificTrans,deleteTransaction} =useContext(TransactionContext)

  let {id}=useParams()


async function getCustomerData(id){
  setLoading(true)
  let data = await getCustomerById(id)


  // console.log(data.data);
  setCustomer(data.data)
  // console.log(trans?.data?.filter((trans)=>trans.customer_id==id));
  

  setLoading(false)
}


async function getCustomerTrans(id) {
  setLoading(true);
  try {
    let trans = await getSpecificTrans(id);
    // console.log('Transactions data:', trans);
    setTotalTrans(trans);
  } catch (error) {
    console.error('Error fetching transactions:', error);
  } finally {
    setLoading(false);
  }
}




async function getAllCustomerTrans(id) {
  setLoading(true);
  try {
    let allTrans = await getAllSpecificTrans(id);
    // console.log('All Transactions data:', allTrans);
    setCustomerTrans(allTrans);
  } catch (error) {
    console.error('Error fetching transactions:', error);
  } finally {
    setLoading(false);
  }
}


async function deleteTrans(transId){
  setLoading(true);
  await deleteTransaction(transId)
  getAllCustomerTrans(id)
  getCustomerTrans(id)
  setLoading(false);
}



useEffect(() => {
  getCustomerData(id)
  getCustomerTrans(id)
 
  getAllCustomerTrans(id)

}, [id])





// console.log(id);

  return <>
  {Loading ? <Loader/> :null}
  
  <h1 className='text-center text-blue-500 font-semibold text-3xl my-3'>Customer Details</h1>

  <div className="row bg-white border border-blue-200 rounded-lg shadow my-6">

  <div className='w-full  md:w-1/4 border-b md:border-r md:border-b-0 border-blue-200 flex justify-center items-baseline  flex-row md:flex-col  gap-2 md:gap-0'>
    <h3 className=' mt-4 font-semibold'>Name : <span className='text-blue-500'> {customer.name}</span></h3>
    <h3 className=' my-8 font-semibold'>ID : <span className='text-blue-500'> {customer.id}</span></h3>
    <h3 className=' mb-4 font-semibold'>Total Amount : <span className='text-blue-500'> {totalTrans}</span></h3>
    <h3 className=' my-4 font-semibold'>Total transactions : <span className='text-blue-500'> {customerTrans.length}</span></h3>

  </div>

  <div className='w-full md:w-3/4 border-b md:border-b-0 border-blue-200 flex flex-col p-3 gap-2 '>
 

  <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
  <table className="w-full text-lg text-center rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400 text-center">
      <tr className='text-center'>
        <th scope="col" className="px-6 py-3">
        Transaction ID         </th>
        <th scope="col" className="px-6 py-3 ">
           Date
        </th>
        <th scope="col" className="px-6 py-3 ">
          Amount
        </th>
       
        <th scope="col" className="px-6 py-3 ">
          Delete
        </th>
       
      </tr>
    </thead>
    <tbody>

    {
    customerTrans.length==0 ?null: customerTrans?.map((trans)=>{
    
      return(

        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 " key={trans.id}>
        <td scope="row" className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <span className=''>{trans.id}</span>
        </td>
        <td className="px-6 py-4">
        {trans.date}
        </td>
        <td className="px-6 py-4">
        {trans.amount}
        </td>
        <td className="px-6 py-4">
        <span onClick={()=>deleteTrans(trans.id)}><i className="fa-solid fa-trash-can text-xl text-red-500 cursor-pointer"></i></span>
        </td>
      
       
      </tr>
      )
    
    })
  }


    

    </tbody>
  
  </table>
  <div className='w-full flex justify-center'>
    
    <Link to={`/addtransaction/${customer.id}`}  className="block max-w-sm px-12 py-1 my-2 bg-white border border-blue-200 transition-all duration-500 rounded-lg shadow hover:bg-blue-100 dark:bg-blue-800 dark:border-blue-700 dark:hover:bg-blue-700">
       
       <div className='text-center'><i className="fa-solid fa-money-bill-trend-up text-xl text-blue-600"></i></div>
       <h3 className='text-center  text-blue-900 font-semibold'>Add Transaction</h3>
 
 </Link>
    
  </div>
</div>









 
   
  </div>
  </div>
 <h2 className='text-center text-blue-500 font-semibold text-3xl my-3'>Explains Charts</h2>

{ customerTrans.length==0 ?<h2 className='text-red-400 text-xl text-center'>no data for this customer you csn add transactions to show his charts</h2>:<>
  <div className="row bg-white border border-blue-200 rounded-lg shadow my-6">
  <div className='w-full flex flex-wrap flex-col md:flex-row justify-center'>
  

    <div className='w-full md:w-1/2'>
    <div style={{ width: '90%', height: 350 }}>
      <ResponsiveContainer>
        <LineChart data={customerTrans}
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
    <div className='w-full md:w-1/2'>

    <div style={{ width: '90%', height: 350 }}>
      <ResponsiveContainer>
        <BarChart data={customerTrans}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Line type="monotone" dataKey="amount" stroke="#8884d8" /> */}
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>      




    <div className='w-full md:w-1/2'>

    <div style={{ width: '90%', height: 350 }}>
      <ResponsiveContainer>
        <ComposedChart data={customerTrans}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="amount" fill="#8884d8" stroke="#8884d8" />
          <Line type="monotone" dataKey="amount" stroke="#ff2200" />
          <Bar dataKey="amount"  barSize={40} fill="#8884d8" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
    </div>   

    <div className='w-full md:w-1/2'>

    <div style={{ width: '90%', height: 350 }}>
      <ResponsiveContainer>
        <AreaChart data={customerTrans}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
             <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
   
  </defs>
  <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
         
          <Area type="monotone" dataKey="amount" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          
        </AreaChart>
      </ResponsiveContainer>
    </div>
    </div>   

  
 



    <div className='w-full md:w-1/2'>

    <div style={{ width: '90%', height: 350 }}>
      <ResponsiveContainer>
        <RadialBarChart innerRadius="10%" 
  outerRadius="80%"  startAngle={180} 
  endAngle={0} data={customerTrans}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid stroke="#f5f5f5" />
       

          <Tooltip />
          <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right"/>
          <RadialBar minAngle={15} fill="#8884d8" label={{ fill: '#8884d8', position: 'insideStart' }} background clockWise={true} dataKey='amount' />

        </RadialBarChart>
      </ResponsiveContainer>
    </div>
    </div>      





  
 
 


    </div>

  </div>
</>}



  
  </>
}
