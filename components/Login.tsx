"use client";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Input } from "./ui/input";
import { Form } from "antd";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";

const Login = () => {
  const [sent, setSent] = useState(false);
  const login = (values: any) => {
    console.log(values);
  };
  const veifyOtp = (values: any) => {
    console.log(values);
  };

  return (
    <div className="bg-gray-100 h-screen overflow-hidden flex items-center justify-center animate__animated animate__fadeIn">
      {sent ? (
        <Card className="w-112.5 relative z-10 shadow-lg animate__animated animate__slideInUp animate__faster">
          <CardHeader>
            <CardTitle className="text-4xl font-bold">
              OTP Verification
            </CardTitle>
            <CardDescription>Check your mobile phone</CardDescription>
          </CardHeader>
          <CardContent>
            <Form onFinish={veifyOtp}>
              <Form.Item name="otp" rules={[{ required: true }]}>
                <InputOTP maxLength={4} defaultValue="123456">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="p-6" />
                    <InputOTPSlot index={1} className="p-6" />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} className="p-6" />
                    <InputOTPSlot index={3} className="p-6" />
                  </InputOTPGroup>
                </InputOTP>
              </Form.Item>
              <Form.Item>
                <Button
                  type="submit"
                  className="py-6 w-full text-base font-medium bg-zinc-700 hover:bg-zinc-900"
                >
                  <ArrowRight />
                  Verify
                </Button>
              </Form.Item>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-112.5 relative z-10 shadow-lg animate__animated animate__slideInUp animate__faster">
          <CardHeader>
            <CardTitle className="text-4xl font-bold">Login</CardTitle>
            <CardDescription>Welcome!</CardDescription>
          </CardHeader>
          <CardContent>
            <Form onFinish={login}>
              <Form.Item name="mobile" rules={[{ required: true }]}>
                <PhoneInput country={"in"} inputClass="w-full!" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="submit"
                  className="py-6 w-full text-base font-medium bg-zinc-700 hover:bg-zinc-900"
                >
                  <ArrowRight />
                  Next
                </Button>
              </Form.Item>
            </Form>
            <CardFooter>
              <CardDescription>Dont Have An Account</CardDescription>
              <Link href="/signup">
                <Button variant="link">Sign up</Button>
              </Link>
            </CardFooter>
          </CardContent>
        </Card>
      )}
      <div className="bg-linear-to-r from-violet-400 via-violet-500 to-indigo-500 w-270 h-270 fixed -bottom-175 rounded-full left-1/2 -translate-x-1/2"></div>
    </div>
  );
};

export default Login;
