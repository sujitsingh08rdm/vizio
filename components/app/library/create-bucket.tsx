'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, Input, Select } from 'antd'
import { ArrowRight } from 'lucide-react'
import React from 'react'

const CreateBucket = () => {
  const create = (values: any)=>{
    console.log(values)
  }
  
  return (
    <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Let`s create your first video library</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum facilis nemo, dolorem natus optio magnam tempora quaerat obcaecati aliquam voluptatibus voluptatem, quia fugiat aperiam cumque voluptate in doloribus consectetur vel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form onFinish={create}>
            <div className="grid grid-cols-2 gap-8">
              <Form.Item name="bucketName" rules={[{required: true}]}>
                <Input
                  size='large'
                  placeholder='Enter bucket name'
                />
              </Form.Item>

              <Form.Item name="region" rules={[{required: true}]}>
                <Select size='large' placeholder="Choose region">
                  <Select.Option value="ap-south-1">ap-south-1 (India)</Select.Option>
                  <Select.Option value="us-east-1">us-east-1 (USA)</Select.Option>
                  <Select.Option value="ap-southeast-1">ap-southeast-1 (Singapore)</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item>
              <Button size="lg" className='bg-gradient-to-r from-rose-500 to-amber-400'>
                <ArrowRight />
                Create
              </Button>
            </Form.Item>
          </Form>
        </CardContent>
    </Card>
  )
}

export default CreateBucket
