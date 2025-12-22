import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Layout } from "./Layout";

// const initialValues = {
//   username: "",            
//   password: "",
// };

// const validate = (values) =>{
//   const errors = {};               /// validation using formik
//   if(!values.username){
//     errors.username = 'Required';
//   } else if(values.username.length > 15){
//    errors.username = 'Must be 15 characters or less'
//   }
//   return errors;
// }


const SignUp = () => {
    const [formError , setFormError] = useState('');
    const [submitMessage, setSubmitMessage] = useState('')
    let navigate = useNavigate();

   // to create form use formik hook useFormmik that contains three object
   //  inititalValues , validationSchema , and onSubmit .
  const formik = useFormik({
    initialValues: {username:'', password :''}, // initialValues for inputs, pass this key names exactly same on your inputs id, name ,onChange ,onBlur e.g. name='username',onChange={formik.username}
    validationSchema : Yup.object({   
      username: Yup.string()                    // validation using Yup 
      .max(15,'Must be 15 characters or less')
      .required('Required'),
      password: Yup.string()
      .max(20,'Must be 20 characters or less')
      .required('Required')
    }),
    onSubmit: (values,{setSubmitting}) => {
      // console.log(values);              // onSubmit object that contains a callBack fun that reaturns values and setSubmitting
        setTimeout(()=>{
          axios.post('https://dummyjson.com/auth/login', values)   // setTimeout that validates credentials 
          .then(response =>{  
            sessionStorage.setItem('token',response.data.accessToken); 
            // setSubmitMessage(<p className="p-3 bg-green-200 text-green-500 text-sm">`New Category added sucesfully`</p>) 
            setSubmitMessage(`Welcome, ${response.data.username}!`);                 
            console.log(response);
            navigate('/')
            setSubmitting(false) 
          })
          .catch(error =>{
            setFormError(error)
          })
          setSubmitting(false)  // to finish on onSubmit cycle 
        },400);
    },
  });

  return (
    <>
      <div className="main flex justify-center items-center min-h-screen">
        <div className="container-box flex flex-col text-center rounded-xl w-[360px] py-10 px-6 bg-[linear-gradient(45deg,hsla(240,8%,88%,1)_50%,hsla(170,41%,71%,1)65%)] ">
          <div className="heading-logo mb-5">
            <h1 className="text-7xl">SH</h1>
            <p>STYLE HUB</p>
          </div>
         
          <form onSubmit={formik.handleSubmit}>  
            <div className="inputs flex flex-col">
            <label htmlFor="username" className="mr-100 text-xs">
              Username
            </label>
            <input
              id="username"
              className="border-b-2   border-gray-400  hover:border-gray-700 mb-5 outline-none"
              type="text"
              placeholder="Username"
            //   name="username"
            //   onChange={formik.handleChange}
            //   onBlur={formik.handleBlur}
            //   value={formik.values.username} / instead of this use {...formik.getFieldProps('username')}

            {...formik.getFieldProps('username')}
             
            />
            {formik.touched.username &&formik.errors.username ? <span className="text-sm text-red-700">{`Username is ${formik.errors.username}`}</span> : null}

            <label htmlFor="password" className="mr-100 text-xs">
              Password
            </label>
            <input
              id="password"
              className="border-b-2 border-gray-400 hover:border-gray-700 outline-none"
              type="password"
              placeholder="Password"
            //   name="password"
            //   onChange={formik.handleChange}
            //   onBlur={formik.handleBlur}
            //   value={formik.values.password}  
              {...formik.getFieldProps('password')}
              
            />
            {formik.touched.password && formik.errors.password ? <div>{`Password is ${formik.errors.password}`}</div> : null}
            {submitMessage && <div style={{ marginTop: '10px' }}>{submitMessage}</div>}
            <button type="submit"  className="bg-[#96D3C9]  rounded-md px-6 py-1 mx-auto  mt-8">
            SUBMIT
          </button>
          {/* {formik.handleSubmit ? <p className="p-3 bg-green-200 text-sm text-green-500">New Category Added Succesfully</p>:null } */}
          

          </div>
          </form>

          {formError && <p className=" mt-1 text-sm text-red-700">{formError}</p>}
 
        </div>
      </div>
    </>
  );
};

export default SignUp;
