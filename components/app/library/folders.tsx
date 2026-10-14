'use client'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Form, Modal } from 'antd'
import { ExternalLink, FolderOpen, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const gradients = [
  "bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300",
  "bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400",
  "bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400",
  "bg-gradient-to-r from-lime-400 via-green-400 to-emerald-300",
  "bg-gradient-to-r from-yellow-400 via-orange-400 to-rose-400",
  "bg-gradient-to-r from-fuchsia-400 via-pink-400 to-rose-300",
  "bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-300",
  "bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-300",
  "bg-gradient-to-r from-amber-400 via-yellow-400 to-lime-300",
  "bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-300"
]


const Folders = () => {
  const pathname = usePathname()
  const [folderForm] = Form.useForm()
  const [open, setOpen] = useState(false)

  const createFolder = (values: any)=>{
    console.log(values)
  }

  const handleClose = ()=>{
    setOpen(false)
    folderForm.resetFields()
  }

  return (
    <div className='space-y-8'>
      <Card className='shadow-none'>
        <CardHeader>
          <CardTitle>Folder`s Utility</CardTitle>
        </CardHeader>
        <CardContent className='flex gap-8'>
          <Input placeholder='Search these contents' />
          <Button onClick={()=>setOpen(true)}>
            <PlusIcon />
            Add new
          </Button>
        </CardContent>
      </Card>
      <div className='grid grid-cols-3 gap-8'>
        {
          Array(100).fill(0).map((item, index: number)=>{
            const gradientIndex = index % gradients.length
            const grad = gradients[gradientIndex]

            return (
              <Link key={index} href={`${pathname}/html-tutorials`}>
                <Card className='shadow-none transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110'>
                  <CardHeader>
                    <i className={`ri-folder-open-fill text-5xl text-rose-600 text-transparent bg-clip-text ${grad}`}></i>
                    <CardAction className='text-xs text-gray-500'>
                      July 2, 2025
                    </CardAction>
                  </CardHeader>
                  <CardHeader>
                    <CardTitle className={`text-transparent bg-clip-text ${grad}`}>Html Tutorial</CardTitle>
                    <CardDescription>22 files</CardDescription>
                    <CardAction className='text-xs text-gray-500 font-medium'>455 MB</CardAction>
                  </CardHeader>
                </Card>
              </Link>
            )}
          )
        }
      </div>
      <Modal open={open} title="Create a new folder" footer={null} onCancel={handleClose}>
        <Form onFinish={createFolder} form={folderForm}>
          <Form.Item name="folderName" rules={[{required: true}]}>
            <Input placeholder='Folder name ?' />
          </Form.Item>
          <Form.Item>
            <Button variant="secondary" className='hover:bg-slate-900 hover:text-white'>Create</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Folders
