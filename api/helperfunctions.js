const {db, firebase} = require('./firebase')
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

const handlePaymentIntentSucceeded = async (paymentIntent) => {
  const { amount, billing_details, metadata } = paymentIntent.charges.data[0];

  let doc = await db.collection('users').where('email', '==', billing_details.email).get()

  try {
    doc.forEach(data => {
      db.collection('users').doc(data.id)
      .set({ticket: {
        name: billing_details.name, 
        price: amount, 
        title: metadata.title,
        date: serverTimestamp, 
        status: 'Payment completed'
      }}, {merge: true})
    });
  } catch (error) {
    console.log('Database error', error)
  }
}

module.exports = {handlePaymentIntentSucceeded}