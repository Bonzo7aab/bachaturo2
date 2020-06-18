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
    .then(({user}) => {
      const db = app.firestore()
      db.collection('users').onSnapshot(snapshot => {
        const data = snapshot.docs[0]
        console.log(data.data())
      })
    })
    .catch(err => console.log(err.message))
}

const resetPassword = (e) => {
  console.log(e.target)
  // fix email template
  app.auth().sendPasswordResetEmail('bonzo7aab@gmail.com')
    .then(res => console.log(res))
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
            <button disabled type='button' onClick={(e) => resetPassword(e)}>Reset password</button>
          </Form>
        </Formik>
    </div>
  )
}

export default Login