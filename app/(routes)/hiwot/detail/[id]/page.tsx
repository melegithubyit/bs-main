import React from 'react'
import HiwotDetailPage from '@/page-files/HiwotDetailPage'

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <HiwotDetailPage params={params} />
    </div>
  )
}

export default page
