/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet } from 'react-native' 
import { StripeProvider } from '@stripe/stripe-react-native'
import PaymentComponent from './src/components/Payment'

const App = () => {
  return (
    <StripeProvider
        publishableKey="pk_test_51AROWSJX9HHJ5bycpEUP9dK39tXufyuWogSUdeweyZEXy3LC7M8yc5d9NlQ96fRCVL0BlAu7Nqt4V7N5xZjJnrkp005fDiTMIr"
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        merchantIdentifier="merchant.com" // required for Apple Pay
      >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar />
        <PaymentComponent />
      </SafeAreaView>
    </StripeProvider>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffba08'
  }
})

export default App
