'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { Input } from './ui/input'
import {Form} from 'antd'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './ui/input-otp'
import Link from 'next/link'
import { UserInterface } from './signup'
import httpRequest from '@/lib/http'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [user, setUser] = useState<UserInterface | null>(null)
  const [sent, setSent] = useState(false)
  const router = useRouter()

  const login = async (values: any)=>{
    try {
      await httpRequest.post("/auth/send-otp", values)
      setUser(values)
      setSent(true)
    }
    catch(err)
    {
      if(err instanceof Error)
        console.log(err.message)
    }
  }

  const verifyOtp = async (values: any)=>{
    try {
      if(!user)
        return

      const payload = {
        mobile: user.mobile,
        otp: values.otp
      }

      await httpRequest.post("/auth/verify-otp", payload)
      router.replace("/app")
    }
    catch(err)
    {
      if(err instanceof Error)
        console.log(err.message)
    }
  }

  return (
    <div className='bg-gray-100 h-screen overflow-hidden flex items-center justify-center animate__animated animate__fadeIn'>
          {
            sent ?
              <Card className='w-[450px] relative z-50 shadow-lg animate__animated animate__slideInUp animate__faster'>
              <CardHeader>
                <CardTitle className='text-4xl font-bold'>Otp Verification</CardTitle>
                <CardDescription>Check your mobile phone</CardDescription>
              </CardHeader>
              <CardContent>
                <Form onFinish={verifyOtp}>
                  <Form.Item name="otp" rules={[{required: true}]}>
                      <InputOTP maxLength={6}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className='p-8'/>
                          <InputOTPSlot index={1} className='p-8'/>
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={2} className='p-8'/>
                          <InputOTPSlot index={3} className='p-8' />
                        </InputOTPGroup>
                      </InputOTP>
                  </Form.Item>

                  <Form.Item>
                    <Button className='py-6 w-full text-base font-semibold bg-zinc-700 hover:bg-zinc-900'>
                      <ArrowRight />
                      Verify
                    </Button>
                  </Form.Item>
                </Form>
              </CardContent>
              </Card>
              :
              <Card className='w-[450px] relative z-50 shadow-lg animate__animated animate__slideInUp animate__faster'>
                <CardHeader>
                  <CardTitle className='text-4xl font-bold'>Sign in</CardTitle>
                  <CardDescription>Welcome back again !</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form onFinish={login}>
                    <Form.Item name="mobile" rules={[{required: true}]}>
                      <PhoneInput
                        country={'in'}
                        inputClass='!w-full'
                      />
                    </Form.Item>

                    <Form.Item>
                      <Button className='py-6 w-full text-base font-semibold bg-zinc-700 hover:bg-zinc-900'>
                        <ArrowRight />
                        Next
                      </Button>
                    </Form.Item>
                  </Form>
                  <CardFooter>
                    <CardDescription>Don`t have an account ?</CardDescription>
                    <Link href="/signup">
                      <Button variant="link">Sign up</Button>
                    </Link>
                  </CardFooter>
                </CardContent>
              </Card>
          }
          <div className='bg-gradient-to-r from-purple-400 via-indigo-500 to-violet-500 w-[1080px] h-[1080px] fixed rounded-full -bottom-[700px] left-1/2 transform -translate-x-1/2'>
          </div>
    </div>
  )
}

export default Login