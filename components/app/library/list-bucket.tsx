import { Button } from '@/components/ui/button'
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ListBucket = () => {
  return (
    <Card className='bg-gradient-to-r from-rose-500 to-amber-400 shadow-none border-0'>
    <CardHeader>
        <CardTitle className='text-lg text-white'>codingott-systems</CardTitle>
        <CardDescription className='text-white'>July 2, 2025</CardDescription>
        <CardAction>
          <Link href={`/app/library/codingott-systems`}>
            <Button variant="outline">
                <ExternalLink />
                Explore
            </Button>
          </Link>
        </CardAction>
    </CardHeader>
    </Card>
  )
}

export default ListBucket
