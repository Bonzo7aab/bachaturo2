import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import app from '../firebase/firebase'

import '../Login/login.css'

let validationSchema = Yup.object({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required')
})
const initialValues = { email: 'test@gmail.com', password: ''}
const ErrorDiv = (props) => {
  return (
    <div className='validate_error'>{props.children}</div>
    )
}

const SignUp = () => {
  const [registerMsg, setRegisterMsg] = useState(null)
  const history = useHistory()

  const onSubmit = values => {
    app.auth().createUserWithEmailAndPassword(values.email, values.password)
    .then(({user}) => {
        let userData = {
          id: user.uid,
          email: user.email
        }
        // create user in DB
        app.firestore().collection('users').doc(user.uid).set(userData)
          .then(response => {
            history.push('/')
          })
          .catch(err => console.log(err.message))
      })
      .catch(err => {
        console.log(err.message)
        setRegisterMsg(err.message)
      })
  }

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
          {registerMsg ? <div className='validate_error'>{registerMsg}</div> : null}
        </Form>
      </Formik>
  </div>
  )
}

export default SignUp
