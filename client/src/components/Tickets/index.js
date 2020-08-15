import React, {useState, useEffect, useContext} from 'react'
import { useHistory } from "react-router-dom";
import {AuthContext} from '../../context/AuthProvider' 
import {TicketContext} from '../../context/TicketProvider' 
import CircularProgress from '@material-ui/core/CircularProgress';
import {app} from '../../firebase'

import './ticket.css'

const getTicketsList = async (setTickets) => {
  const ticketArray = [];
  const doc = await app.firestore().collection('tickets').get()
  doc.forEach(doc => {
    ticketArray.push({data: doc.data(), id: doc.id})
  })
  setTickets(ticketArray)
}

const Tickets = () => {
  const { currentUser } = useContext(AuthContext)
  const {setTicket} = useContext(TicketContext)
  const [tickets, setTickets] = useState(null)
  const history = useHistory()

  useEffect(() => {
    getTicketsList(setTickets)
  }, [])
  
  const orderTicket = ticket => {
    if(currentUser) {
      setTicket(ticket)
      history.push('/payment')
    } else {
      history.push('/login')
    } 
  }
  
  return (
    <div className='ticket'>
      {tickets ? tickets.map(ticket => (
        <div key={ticket.id} className='ticket_container'>
          <h2>{ticket.data.title}</h2>
          <h3>{ticket.data.price}&euro;</h3>
          <p>{ticket.data.description}</p>
          <button 
            onClick={() => orderTicket(ticket)}>Order</button>
        </div>
      )) : <div className='ticket_loading'><CircularProgress /></div>}
    </div>
  )
}

export default Tickets
