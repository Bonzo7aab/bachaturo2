import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import app from '../firebase/firebase'

import './login.css'

let validationSchema = Yup.object({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required')
})
const initialValues = { email: 'bonzo7aab@gmail.com', password: ''}
const ErrorDiv = (props) =>  <div className='validate_error'>{props.children}</div>
const onSubmit = values => {
  app.auth().signInWithEmailAndPassword(values.email, values.password)
    .then(response => console.log(response))
    .catch(err => console.log(err.message))
}

const Login = () => {
  return (
    <div className='login'>
      <h1>Login</h1>
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
            <button type='submit'>Login</button>
          </Form>
        </Formik>
    </div>
  )
}

export default Login