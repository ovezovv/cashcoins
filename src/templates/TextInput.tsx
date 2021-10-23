import React from 'react'
import { TextInput, TextInputBase } from 'react-native'

interface Props {
  style?: object
  autoCapitalize?: any
  textContentType?: any
  placeholder?: string
  placeholderTextColor?: string
}

export default ({ style, autoCapitalize, textContentType, placeholder, placeholderTextColor }: Props) => {
  return (
    <TextInput
      autoCapitalize={autoCapitalize}
      textContentType={textContentType}
      placeholder={placeholder} 
      placeholderTextColor={placeholderTextColor} 
      style={style}
    />
  )
}
