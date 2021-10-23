import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import { CardField, useStripe } from "@stripe/stripe-react-native"

const Payment = () => {
  const [key, setKey] = useState('')
  const {confirmPayment} = useStripe()
  const [cardDetails, setCard] = useState({})

  useEffect(() => {
    fetch('http://localhost:3000/create-payment-intent', {
      method: 'POST'
    }).then(res => res.json()).then(res => {
        console.log('intent', res)
        const intent = res as {paymentIntent: string}
        setKey(intent.paymentIntent)
      })
  }, [])

  const handlePayment = async () => {
   const { error } = await confirmPayment(key, {
      type: 'Card',
      billingDetails: {
        email: 'meylis.ovezov.98@gmail.com',
      }
    })

    if(error){
      Alert.alert(error.message)
    }else{
      Alert.alert('Payment was succesful!')
    }
  }

  return (
    <View style={styles.paymentContainer}>
      <Text style={styles.mainTitle}>Cash Coin</Text>
      <View style={styles.cardFieldContainer}>
        <CardField
          style={styles.cardField}
          postalCodeEnabled={false}
          cardStyle={{textColor: '#ffba08'}}
          onCardChange={(cardDetails) => {
            console.log('card details', cardDetails); 
            setCard(cardDetails);
            }}
        />
        <TouchableOpacity onPress={handlePayment} style={styles.payButton}>
          <Text style={styles.payButtonTitle} onPress={handlePayment}>Pay now</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainTitle: {
    color: '#ffba08',
    fontSize: 48,
    textAlign: 'center',
    marginTop: 50,
    shadowColor: '#ffba08',
    shadowOpacity: 7,
    shadowRadius: 30,
    fontWeight: '800',
  },

  paymentContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: '#000',
    padding: 15,
  },
  cardFieldContainer: {
    display: 'flex',
    marginTop: 200, 
    height: "18%",
    width: "100%"
  },

  cardField: {
    height: 60,
    width: "100%",
    borderRadius: 7,
    marginBottom: 150,
    shadowColor: '#ffba08',
    shadowOpacity: 30,
    shadowRadius: 10,
  },
  payButton: {
    position: 'relative',
    width: "100%",
    height: 50, 
    padding: 5,
    color: '#000',
    borderRadius: 7,
    alignSelf: 'center',
    backgroundColor: '#ffba08',
  },
  payButtonTitle: {
    textAlign: 'center',
    marginTop: 6, 
    color: '#000',
    fontWeight: "600",
    fontSize: 22,
  },
  inputField: {
    height: 50,
    width: '100%',
    padding: 15,
    borderRadius: 7,
    borderColor: '#ffba08',
    borderWidth: 1,
    marginBottom: 25
  },
  input: {
    color: '#ffba08',
    fontSize: 18,
    fontWeight: '500'
  }

})

export default Payment
