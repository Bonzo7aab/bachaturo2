import React, { useState, useContext } from 'react'
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { TicketContext } from '../../context/TicketProvider'
import { AuthContext } from "../../context/AuthProvider";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const {ticket} = useContext(TicketContext)
  const {currentUser} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [cardOwner, setCardOwner] = useState('')
  const [snackbar, setSnackbar] = useState({open: false, message: '', severity: 'success'})

  const handlePayment = async (event) => {
    event.preventDefault()
    setLoading(true)
    
    const { request } = await axios.post('/payment', {price: ticket.data.price, title: ticket.data.title })
    
    if(request.status === 200){
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          name: cardOwner,
          email: currentUser.email
        }
      });
      
      if(paymentMethodReq.error) setSnackbar({open: true, message: 'Payment request Failed!', severity: 'error'})
      
      const { error } = await stripe.confirmCardPayment(request.response, {
        payment_method: paymentMethodReq.paymentMethod.id
      });
      
      if(error) setSnackbar({open: true, message: 'Payment confirmation Failed!', severity: 'error'})
      
      console.log('Success!!!!!')
      setLoading(false)
      setSnackbar({open: true, message: 'Payment Successful!', severity: 'success'})

    } else {
      setSnackbar({open: true, message: 'Payment Failed!', severity: 'error'})
    }
  }

  return (
    <div>
      Payment
      {ticket ? (
      <form onSubmit={handlePayment}>
        <label htmlFor='cardOwner'>Card owner</label>
        <input type='text' name='cardOwner' value={cardOwner} onChange={(e) => setCardOwner(e.target.value)} />
        <CardElement />
        <button type="submit" disabled={!stripe || loading}>
          Pay {ticket.data.price}zl
        </button>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbar.open}
        >
          <Alert variant="filled" severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </form>
      )
      : <div>No ticket</div>}
    </div>
  )
}

export default Payment
