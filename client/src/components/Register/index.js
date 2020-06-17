import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import app from '../firebase/firebase'

import '../Login/login.css'

let validationSchema = Yup.object({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required')
})
const initialValues = { email: 'test', password: ''}
const ErrorDiv = (props) => {
  return (
    <div className='validate_error'>{props.children}</div>
    )
  }
const onSubmit = values => {
  app.auth().createUserWithEmailAndPassword(values.email, values.password)
    .then(response => console.log(response))
    .catch(err => console.log(err.message))
}

const SignUp = () => {
  return (
    <div className='login'>
    <h1>Register</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
        <Form className='form_login'>
          <div>
            <label htmlFor='email'>Email</label>
            <Field 
              type='text' 
              id='email' 
              name='email' 
            />
            <ErrorMessage name='email' component={ErrorDiv} />        
          </div>
          <div>
            <label htmlFor='name'>Password</label>
            <Field 
              type='text' 
              id='password' 
              name='password' 
            />
            <ErrorMessage name='password' component={ErrorDiv} />  
          </div>
          <button type='submit'>Register</button>
        </Form>
      </Formik>
  </div>
  )
}

export default SignUp
