import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios'
import './contact.css'

const initialValues = {name: '', email: '', subject: 'Organisation', message: ''}

let validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  message: Yup.string().required('Required')
})

const ErrorDiv = (props) =>  <div className='validate_error'>{props.children}</div>

const Contact = () => {
  const [snackbar, setSnackbar] = useState({open: false, message: '', severity: 'success'})
    
  const onSubmit = values => {
    console.log(values)
    axios.post('/contact', values)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    setSnackbar({open: true, message: 'Message send', severity: 'success'})
    setTimeout(() => {
      setSnackbar({open: false})
    }, 4000);
  }

  return (
    <div className='contact'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
          <Form className='contact_form'>
            <div>
              <Field
                name='name'
                placeholder='Name..'
              />
              <ErrorMessage name='name' component={ErrorDiv} />        
            </div>
            <div>
              <Field 
                name='email'
                placeholder='Email..'
              />
              <ErrorMessage name='email' component={ErrorDiv} />  
            </div>
            <div>
              <Field name="subject" component="select">
                <option value="Organisation">Organisation</option>
                <option value="Tickets/Charges">Tickets/Charges</option>
                <option value="Accomodation">Accomodation</option>
                <option value="Other">Other</option>
              </Field>
            </div>
            <div>
              <Field 
                component='textarea'
                name='message'
                placeholder='Message here..'
              />
              <ErrorMessage name='message' component={ErrorDiv} />  
            </div>
            <button type='submit'>Login</button>
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

export default Contact
