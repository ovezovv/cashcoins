  import { expressionStatement } from '@babel/types'
import express from 'express'
import Stripe from 'stripe'


  const stripe = new Stripe('sk_test_51JkzRkIKFQgFiQoUT2xcDpWBiq5FMCdLZIP6RqNDbpZjY2BadGlFbF1TdbyLv4DZHjS3lnXPiRQVyL1oocsMZObm009kBuL43z', {
    apiVersion: '2020-08-27',
    typescript: true
  })

  const app = express()

  app.use(express.json())

  app.post('/create-payment-intent', async (req, res) => {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 5000, //defines in cents  
        currency: 'usd',  
      })

      res.send({
        clientSecret: paymentIntent.client_secret
      })  
  })

  app.listen(3000, () => console.log('Running stripe server on http://localhost:3000'))