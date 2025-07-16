import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Button, Text, View } from 'react-native'
import CustomInput from '@/components/CustomInput'
import CustomButton from '@/components/CustomButton'
import { SignIn } from '@/lib/appwrite'
import * as Sentry from '@sentry/react-native';


const signIn = () => {

  const [isSubmitting , setIsSubmiting] = useState(false);
  const [form, setForm] = useState( {email: '' , password: ''});

  const submit = async ()=> {

    const { email , password } = form;

    if(!email || !password ) return Alert.alert('Error' , 'Please enter valid email adress and password.')
      setIsSubmiting(true)

    try{
     await  SignIn({email , password})

      Alert.alert('Success' , 'user signed in successfuly.')
      router.replace('/');
    } catch (error:any){
      Alert.alert('Error', error.message )
      Sentry.captureEvent(error);
    } finally{
      setIsSubmiting(false);
    }
  }

  return (
    <View className=" gap-10 bg-white rounded-lg p-5  mt-5">
     <CustomInput 
        placeholder="Enter your email" 
        value={form.email}
        onChangeText={(text) => setForm( (prev) => ({... prev, email : text }))}
        label="Email"
        keyboardType="email-address"
        />
      <CustomInput 
        placeholder="Enter your password" 
        value={form.password}
        onChangeText={(text) => setForm( (prev) => ({... prev, password : text }))}
        label="Password"
        secureTextEntry= {true}
        />
      <CustomButton
      title="log IN"
      isLoading={isSubmitting}
      onPress={submit}
      /> 

      <View className='flex justify-center mt-5 flex-row gap-2'>
         <Text className="base-regular text-gray-100 ">Dont have an account?</Text>
         <Link href="/signUp" className="base-bold text-primary">Sign Up</Link>
      </View> 
    </View>
  )
}

export default signIn