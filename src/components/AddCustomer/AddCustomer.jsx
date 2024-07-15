import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import style from './AddCustomer.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext'



export default function AddCustomer() {

  
  let {addCustomer} =useContext(UserContext)
  let navigate=useNavigate()
const [values, setValues] = useState({})
  const AddSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'Name Must not be empty')
      .required('Name is required'),
     
  });


  let formik = useFormik({
    initialValues:{
    
      "id": "", 
     
      "name": "" 
     
    },
    validationSchema:AddSchema,
    onSubmit:async (formValues) => {
      formValues.id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      console.log("Form Values before submit:", formValues);
      await addCustomer(formValues);
      navigate('/')
      
    }
  
  });


 
    




  return <>
   <h1 className='text-center text-blue-500 font-semibold text-3xl my-5'>Add Customer</h1>


 <form onSubmit={formik.handleSubmit}  className="max-w-md my-4 mx-auto">

  <label htmlFor="name" className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">Customer Name:</label>
  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name="name" type="text" id="name" aria-describedby="helper-text-explanation" className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Name..' required />
  {formik.errors.name && formik.touched.name ? <div className="text-red-500 text-xs my-2">{formik.errors.name}</div> : null}
 


<button disabled={
            !formik.values.name ||
           
            !!formik.errors.name 
            
          }  type="submit" className="text-white my-4 transition-all px-10 duration-500 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>




</form>

  
  </>
}
