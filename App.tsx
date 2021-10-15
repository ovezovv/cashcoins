/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native' 
import { StripeProvider } from '@stripe/stripe-react-native'
import PaymentComponent from './src/components/Payment'

const App = () => {
  return (
    <StripeProvider
        publishableKey="pk_test_51JkzRkIKFQgFiQoUQYK99GEmZDn5FIhYQwAsDzTUdqEHTgh5Q4LuXvlD1bV9ZKRP0ienPqaqVyUOfiHaQ8MeGmoY00qgwm1sBw"
        merchantIdentifier="merchant.identifier" // required for Apple Pay
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
    backgroundColor: '#000'
  }
})

export default App
