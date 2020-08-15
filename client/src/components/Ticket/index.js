import React from 'react'
import QRCode from 'qrcode.react'

import './ticket.css'

const Ticket = ({userTicket, currentUser}) => {
  const ticketQR = `
    user: ${currentUser.email},
    userId: ${currentUser.uid},
    ticket: ${userTicket.title}
  `

  return (
    <div>
      <div className='profile__ticket'>
        {/* <p>{ticket.date}</p> */}
        <h2>Transaction: {userTicket.status}</h2>
        <h2>{userTicket.title}</h2>
        <h3>{userTicket.price}&euro;</h3>
        <p>{userTicket.description}</p>
        <QRCode value={ticketQR}/>
      </div> 
    </div>
  )
}

export default Ticket
