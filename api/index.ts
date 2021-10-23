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
    // Use an existing Customer ID if this is a returning customer.
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      {customer: customer.id},
      {apiVersion: '2020-08-27'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: 'eur',
      customer: customer.id,
      payment_method_types: ['bancontact', 'card'],
    });
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id
    });
  });
  

  app.listen(3000, () => console.log('Running stripe server on http://localhost:3000'))