/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native' 
import { StripeProvider } from '@stripe/stripe-react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PaymentComponent from './src/components/Payment'
import ProductComponent from './src/components/Product'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <StripeProvider
        publishableKey="pk_test_51JkzRkIKFQgFiQoUQYK99GEmZDn5FIhYQwAsDzTUdqEHTgh5Q4LuXvlD1bV9ZKRP0ienPqaqVyUOfiHaQ8MeGmoY00qgwm1sBw"
        merchantIdentifier="merchant.identifier" // required for Apple Pay
      >
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Product" component={ProductComponent} 
              options={{ title: '', headerStyle: { backgroundColor: '#000'}}}
            />
            <Stack.Screen name="Payment" component={PaymentComponent} options={{ title: 'Payment Checkout', headerStyle: { backgroundColor: '#000'}}} />
          </Stack.Navigator>
        </NavigationContainer>
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
