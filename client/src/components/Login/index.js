import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import {app} from '../../firebase'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import './login.css'

let validationSchema = Yup.object({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required')
})
const initialValues = { email: 'michal@gmail.com', password: 'qwe123'}
const ErrorDiv = (props) =>  <div className='validate_error'>{props.children}</div>


const resetPassword = (e) => {
  console.log(e.target)
  // fix email template
  app.auth().sendPasswordResetEmail('bonzo7aab@gmail.com')
    .then(res => console.log(res))
    .catch(err => console.log(err.message))
  }

const Login = () => {
  const [snackbar, setSnackbar] = useState({open: false, message: '', severity: 'success'})
    
  const onSubmit = values => {
    app.auth().signInWithEmailAndPassword(values.email, values.password)
      .catch((err) => {
        setSnackbar({open: true, message: 'Login failed', severity: 'error'})
      })
  }
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
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbar.open}
        >
          <Alert variant="filled" severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
    </div>
  )
}

export default Login