import React, {useState, useEffect, useContext} from 'react'
import { useHistory } from "react-router-dom";
import {app, firebase} from '../../firebase'
import {AuthContext} from '../../context/AuthProvider' 
import Ticket from '../Ticket'

import './profile.css'

const getUserData = async (currentUser, setUserTicket, setCoupon) => {
  const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()
  const groupPass = {
    title: 'Group Pass Free',
    price: 0,
    description: 'Group Pass Free ticket for group Owner',
    status: 'Completed',
    date: serverTimestamp
  }

  await app.firestore().collection('users').doc(currentUser.uid).onSnapshot(doc => {
      if(!doc.data()){
        console.log('No ticket for current user')
      } else {
        setUserTicket(doc.data().ticket)
        if(!doc.data().coupon) return null
        setCoupon(doc.data().coupon)


        if(Object.entries(doc.data().coupon).length > 5){
          app.firestore().collection('users').doc(currentUser.uid)
            .set({ticket: groupPass}, {merge: true})
        }
      }
    })
}

const verifyCoupon = async (userCoupon, currentUser) => {
  // if(userCoupon != currentUser.uid){
     await app.firestore().collection('users').doc(userCoupon)
    .set({
      coupon: {[currentUser.email]: false} 
    }, {merge: true})
  // } else { console.log('cant add yourself')}
}

const printvalues = (coupon) => {
  return Object.entries(coupon).map(([key, value]) => 
    <li key={key}>{`${key}: ${value}`}</li>
  )
}

const deleteProfile = async (currentUser, history) => {
  await app.firestore().collection('users').doc(currentUser.uid).delete()
  app.auth().currentUser.delete()
  history.push('/login')
}

const Profile = () => {
  const {currentUser} = useContext(AuthContext)
  const [userTicket, setUserTicket] = useState('')
  const [coupon, setCoupon] = useState(null)
  const [userCoupon, setUserCoupon] = useState('')
  const history = useHistory()

  useEffect(() => {
    getUserData(currentUser, setUserTicket, setCoupon)
  }, [currentUser])
  
  return (
    <div className='profile'>
      <div>Profile: {currentUser.email}</div>
      <div>Your Group Code: <h4>{currentUser.uid}</h4></div>

      <div className='ticket_coupon'>
        Coupon: <input value={userCoupon} onChange={e => setUserCoupon(e.target.value)} type='text' />
        <button onClick={() => verifyCoupon(userCoupon, currentUser)}>Verify</button>
      </div>
      {coupon ?
        <div>My coupon participants: {Object.entries(coupon).length} / 10
          <ul>
            {printvalues(coupon)}
          </ul>
        </div>
      : null}
      {userTicket ? 
        <Ticket userTicket={userTicket} currentUser={currentUser} />
      : <p>No tickets</p>}
      <button onClick={() => deleteProfile(currentUser, history)}>Delete Profile</button>
    </div>
  )
}

export default Profile