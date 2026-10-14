import React from 'react'
import CreateBucket from './create-bucket'
import ListBucket from './list-bucket'

const Library = () => {
  return (
    <div className='space-y-8'>
      <CreateBucket />
      <ListBucket />
    </div>
  )
}

export default Library
