import React, { useEffect, useState } from "react"
import { Button, Dimensions, StyleSheet, useWindowDimensions, View, Text, Pressable, TouchableOpacity } from "react-native";
import { ApplePayButton, CardField, useStripe } from "@stripe/stripe-react-native"
import { tSObjectKeyword } from "@babel/types";

const Payment = () => {
  const [key, setKey] = useState()
  const {confirmPayment} = useStripe()


  const handlePayment = () => {
    useEffect(() => {
      fetch('http://localhost:3000/create-payment-intent', {
        method: 'POST'
      }).then(res => res.json())
        .then(res => {
          const intent = res as {clientSecret: string}
          setKey(intent.clientSecret)
        })
    })
  }

  return (
    <View style={styles.paymentContainer}>
      <Text style={styles.mainTitle}>Cash Coin</Text>
      <View style={styles.cardFieldContainer}>
        <CardField
          postalCodeEnabled={false}
          style={styles.cardField}
        />
        <TouchableOpacity onPress={handlePayment} style={styles.payButton}>
          <Text style={styles.payButtonTitle}>Pay now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainTitle: {
    color: '#000',
    fontSize: 48,
    textAlign: 'center',
    marginTop: 50,
    shadowColor: '#000',
    shadowOpacity: 7,
    shadowRadius: 15,
    fontWeight: '800',
  },

  paymentContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: '#ffba08',
    padding: 15,
  },
  cardFieldContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: 20,
    left: 15,
    height: "18%",
    width: "100%"
  },

  cardField: {
    height: 60,
    width: "100%",
    backgroundColor: '#000',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOpacity: 10,
    shadowRadius: 7,
  },
  payButton: {
    position: 'absolute',
    padding: 5,
    width: "100%",
    borderRadius: 10,
    height: 50, 
    bottom: 0,
    alignSelf: 'center',
    color: '#000',
    backgroundColor: '#000',
  },
  payButtonTitle: {
    textAlign: 'center',
    marginTop: 6, 
    color: '#ffba08',
    fontWeight: "600",
    fontSize: 22,
  }
})

export default Payment
