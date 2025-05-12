import JobDetailPage from '@/page-files/JobDetailPage'
import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <JobDetailPage params={params} />
    </div>
  )
}

export default page
