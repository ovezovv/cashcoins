  import { expressionStatement } from '@babel/types'
import express from 'express'
import Stripe from 'stripe'


  const stripe = new Stripe('secret_key', {
    apiVersion: '2020-08-27',
    typescript: true
  })

  const app = express()

  app.use(express.json())

  app.post('/createe-payment-intent', async (req, res) => {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 5000, //defines in cents  
        currency: 'usd',  
      })

      res.send({
        clientSecret: paymentIntent.client_secret
      })  
  })

  app.listen(3000, () => console.log('Running stripe server on http://localhost:3000'))