import accountApiRequest from '@/apiRequests/account'
import { cookies } from 'next/headers'
import React from 'react'

const Page = async () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value!
  let name = ''
  try {
    const result = await accountApiRequest.sMe(accessToken)
    name = result.payload.data.name
  } catch (error: any) {
    if (error.digest?.includes('NEXT_REDIRECT')) {
      throw error
    }
    console.log(error)
  }
  return <div>Page</div>
}

export default Page
