import { Button } from '@/components/ui/button'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tag } from 'antd'
import Image from 'next/image'
import React from 'react'

const Videos = () => {
  return (
    <div className='space-y-8'>
      {
        Array(20).fill(0).map((item, index)=>(
            <Card className='shadow-none' key={index}>
                <CardHeader className='flex'>
                    <Image 
                        src="/images/thumb.jpg"
                        width={100}
                        height={100}
                        alt={`image-${index}`}
                        className='object-cover rounded-lg'
                    />
                    <CardHeader className='flex-1'>
                        <CardTitle>Ch-1 introduction to html language</CardTitle>
                        <CardDescription className='space-x-4'>
                            <label>Size : 200Mb</label>
                            <label>Duration : 30Min</label>
                        </CardDescription>
                        <CardAction>
                            <Tag color="orange-inverse">Draft</Tag>
                        </CardAction>
                    </CardHeader>
                </CardHeader>
                <CardFooter>
                    <Button>Hello</Button>
                </CardFooter>
            </Card>
        ))
      }
    </div>
  )
}

export default Videos
