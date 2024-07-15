import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import style from './AddTtansaction.module.css'
import { useFormik } from 'formik'
import { TransactionContext } from '../../Context/TransactionContext'
import * as Yup from 'yup';



export default function AddTtansaction() {

  let {id}=useParams()
  let {addTransaction,getAllTrans} =useContext(TransactionContext)
  let navigate=useNavigate()
const [values, setValues] = useState({})
  const AddSchema = Yup.object().shape({
    amount: Yup.number()
      .min(1, 'Amount must be greater than zero')
      .required('Amount is required'),
    date: Yup.date()
      .required('Date is required'),
  });


  let formik = useFormik({
    initialValues:{
    
      "id": "", 
      "customer_id": id, 
      "date": "", 
      "amount": "" 
     
    },
    validationSchema:AddSchema,
    onSubmit:async (formValues) => {
      formValues.id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      await addTransaction(formValues);
      await getAllTrans()
      navigate(`/customerdetails/${id}`)}
  
  });


 
    




  return <>
   <h1 className='text-center text-blue-500 font-semibold text-3xl my-5'>Add Transaction</h1>


 <form onSubmit={formik.handleSubmit} onChange={formik.handleSubmit} className="max-w-md my-4 mx-auto">

  <label htmlFor="amount" className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">Transaction Amont:</label>
  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.amount} name="amount" type="number" id="amount" aria-describedby="helper-text-explanation" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='amout..' required />
  {formik.errors.amount && formik.touched.amount ? <div className="text-red-500 text-xs my-2">{formik.errors.amount}</div> : null}
 
<div className="relative max-w-md my-4">
  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
    <svg className="w-4 h-4 text-blue-500 dark:text-blue-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
    </svg>
  </div>
  <input  onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.date} name="date" id="date" datepicker datepicker-autohide type="date" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-blue-700 dark:border-blue-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select Transaction date" required/>
  {formik.errors.date && formik.touched.date ? <div className="text-red-500 text-xs my-2">{formik.errors.date}</div> : null}
</div>

{/* <Link  to={`/customerdetails/${id}`}> */}
<button disabled={
            !formik.values.amount ||
            !formik.values.date ||
            !!formik.errors.amount ||
            !!formik.errors.date
          }  type="submit" className="text-white transition-all px-10 duration-500 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>




</form>

  
  </>
}
