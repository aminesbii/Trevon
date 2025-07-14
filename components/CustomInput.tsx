import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import {CustomInputProps} from "@/type" 
import cn from 'clsx';

const CustomInput = ({ placeholder = 'Enter text' , value, onChangeText , label, secureTextEntry = false , keyboardType = "default" }: CustomInputProps) => {
  const [isFocused ,SetIsFocused] = useState(false);
  return (
    <View className="w-full">
      <Text className="label">{label}</Text>
      <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry= {secureTextEntry}
          keyboardType={keyboardType}
          onFocus={() => SetIsFocused(true)}
          onBlur={ () => SetIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor="#888"
          className={cn('input', isFocused ? 'border-primary' : 'border-gray-300')}
      />
    </View>
  )
}

export default CustomInput