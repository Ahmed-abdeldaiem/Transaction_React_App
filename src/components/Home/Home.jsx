import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios'
import { UserContext } from '../../Context/UserContext'
import { Link } from 'react-router-dom'
import { TransactionContext } from '../../Context/TransactionContext'
import { useFormik } from 'formik'
import Loader from '../Loader/Loader'





export default function Home() {
  const [Loading, setLoading] = useState(false)
const [customers, setCustomers] = useState([])
const [customerTrans, setCustomerTrans] = useState({})
const [display, setDisplay] = useState('card')
let {getAllUsers,getTransForSpecifcUser,getCustomerById} =useContext(UserContext)
let {getAllTrans,getSpecificTrans} =useContext(TransactionContext)

let formik = useFormik({
  initialValues:{
  
    search:"",
  
   
  },
  
  onSubmit:handleSearch,

});

function handleSearch(formValues){

//  console.log(formValues);
 
  return formValues.search
  }


async function getAllCustomers(){
  setLoading(true)
   let data= await getAllUsers() ;
    // console.log(data.data);

    setCustomers(data.data)
    setLoading(false)
}

async function getCustomerTrans(id) {
  let total = await getTransForSpecifcUser(id);
  setCustomerTrans(currentData => ({
      ...currentData,
      [id]: total
  }));
}

async function getRelatedsearch(search){


  if (!Number(search)) {
    setLoading(true)
    let data= await getAllUsers() ;
 
    // console.log(data.data.filter((customer)=>customer.name.toLowerCase().includes(search.toLowerCase())));
    setCustomers(data.data.filter((customer)=>customer.name.toLowerCase().includes(search.toLowerCase())))
    setLoading(false)
  }else if(Number(search)){
   
    let ids=Object.keys(customerTrans);
    let amounts=Object.values(customerTrans)
    let newSet=[];
    ids.map(async (id)=>{
     
      if (customerTrans[id]>=Number(search)) {
        // console.log(id);
        let data= await getCustomerById(id)
        newSet.push(data.data)
        // console.log(newSet);
        setCustomers(newSet)
      }
    })
   
    


  }
 


}


useEffect(() => {
  

  getAllCustomers()
 
 
}, [])

useEffect(() => {
  customers.forEach(customer => {
      getCustomerTrans(customer.id);
  });
}, [customers]);


useEffect(() => {
 
getRelatedsearch(formik.values.search)

}, [formik.values.search]);

  return <>

{Loading ? <Loader/> :null}

  <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit} onChange={formik.handleSubmit}>   
  <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </svg>
    </div>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.search} name="search"  type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Name, Total Amount that Equal or Greater..." required />
    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
  </div>


  {/* <div className='flex my-2 gap-4'>
  <input type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Less Than" required />
  <input type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="More Than" required />


  </div> */}
   

</form>
<div className='flex justify-center gap-7 text-blue-950 text-2xl my-3'>
<span onClick={()=>{setDisplay('table')}}><i className="fa-solid fa-table-list cursor-pointer hover:text-blue-700 transition-all duration-500"></i></span>
<span onClick={()=>{setDisplay('card')}}><i className="fa-solid fa-table-cells-large cursor-pointer  hover:text-blue-700 transition-all duration-500"></i></span>
</div>



{
  display=='card'?<>
<div className='row flex justify-center '>
    



    {
      customers.length==0 ?null: customers?.map((customer)=>{
      
        return(
  
          <div className='w-full md:w-1/2 lg:w-1/4 p-4' key={customer.id}>
         <Link to={`customerdetails/${customer.id}`}  className="block  p-6 bg-white border border-blue-200 transition-all duration-500 rounded-lg shadow hover:bg-blue-100 dark:bg-blue-800 dark:border-blue-700 dark:hover:bg-blue-700">
        
              <div className='text-center'><i className="fa-solid fa-user-large  text-xl md:text-2xl lg:text-[50px] text-blue-600"></i></div>
              <h3 className='text-center text-2xl text-blue-900 font-semibold'>{customer.name}</h3>
              <h3 className='text-center text-xl text-red-900 font-semibold'>Total Trans :{customerTrans[customer.id]}</h3>
              
        </Link>
          </div>
        )
      
      })
    }
  
  <div className='w-full md:w-1/2 lg:w-1/4 p-4'>
          <Link to='addcustomer' className="block max-w-sm p-6 bg-white border border-blue-200 transition-all duration-500 rounded-lg shadow hover:bg-blue-100 dark:bg-blue-800 dark:border-blue-700 dark:hover:bg-blue-700">
         
              <div className='text-center'><i className="fa-solid fa-user-plus  text-xl md:text-2xl lg:text-[50px] text-blue-600"></i></div>
              <h3 className='text-center text-2xl text-blue-900 font-semibold'>Add Customer</h3>
        
        </Link>
          </div>
  
  
  
  
  
  </div>
  
  </>
  :<div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
  <table className="w-full text-lg text-center rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400 text-center">
      <tr>
        <th scope="col" className="px-6 py-3">
        Customer name
        </th>
        <th scope="col" className="px-6 py-3">
          Total Transactions
        </th>
        <th scope="col" className="px-6 py-3">
          Show Details
        </th>
       
      </tr>
    </thead>
    <tbody>

    {
    customers.length==0 ?null: customers?.map((customer)=>{
    
      return(

        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 " key={customer.id}>
        <th scope="row" className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <span className='ps-10'><i className="fa-solid fa-user-large  text-xl  text-blue-600"></i> {customer.name}</span>
        </th>
        <td className="px-6 py-4">
        Total Trans :{customerTrans[customer.id]}
        </td>
        <td className="px-6 py-4">
       
        <Link  to={`customerdetails/${customer.id}`} ><i className="fa-solid fa-circle-info cursor-pointer hover:text-blue-700 transition-all duration-500"></i></Link>
        </td>
      
       
      </tr>
      )
    
    })
  }


    

    </tbody>
  
  </table>
  <div className='w-full flex justify-center'>
    
    <Link to='addcustomer' className="block max-w-sm px-12 py-1 my-2 bg-white border border-blue-200 transition-all duration-500 rounded-lg shadow hover:bg-blue-100 dark:bg-blue-800 dark:border-blue-700 dark:hover:bg-blue-700">
       
       <div className='text-center'><i className="fa-solid fa-user-plus  text-xl text-blue-600"></i></div>
       <h3 className='text-center  text-blue-900 font-semibold'>Add Customer</h3>
 
 </Link>
    
  </div>
</div>
}

  </>
}
