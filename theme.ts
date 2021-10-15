import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
 container: {
  flex: 1,
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  backgroundColor: 'red',
 }
})