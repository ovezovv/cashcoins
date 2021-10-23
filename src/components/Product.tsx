import React, {useState, useEffect} from 'react'
import { Button, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { useStripe } from '@stripe/stripe-react-native'
import { NavigationContainer } from '@react-navigation/native';


export default function CheckoutScreen({ navigation }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`http://localhost:3000/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet()
    await navigation.navigate('Payment') 
  }

  return (
    <View style={styles.paymentContainer}>
      <Text style={styles.mainTitle}>Cash Coin</Text>
      <View style={styles.cardFieldContainer}>
        <View style={styles.inputField}>
          <TextInput
            autoCapitalize="none"
            placeholder="Email address" 
            placeholderTextColor="grey" 
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </View>
        <View style={styles.inputField}>
          <TextInput
            placeholder="Amount"
            placeholderTextColor="grey"
            style={styles.input}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </View>
        <TouchableOpacity onPress={openPaymentSheet} style={styles.payButton}>
          <Text style={styles.payButtonTitle}>Go to Checkout</Text>
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
  payButton: {
    position: 'absolute',
    bottom: '-180%',
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