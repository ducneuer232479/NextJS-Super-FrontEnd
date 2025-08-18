'use client'

import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage
} from '@/lib/utils'
import { useLogoutMutation } from '@/queries/useAuth'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

const LogoutPage = () => {
  const { mutateAsync } = useLogoutMutation()
  const router = useRouter()
  const ref = useRef<any>(null)
  const searchParams = useSearchParams()
  const accessTokenFromUrl = searchParams.get('accessToken')
  const refreshTokenFromUrl = searchParams.get('refreshToken')

  useEffect(() => {
    if (
      ref.current ||
      (accessTokenFromUrl &&
        accessTokenFromUrl !== getAccessTokenFromLocalStorage()) ||
      (refreshTokenFromUrl &&
        refreshTokenFromUrl !== getRefreshTokenFromLocalStorage())
    )
      return

    ref.current = mutateAsync

    mutateAsync().then((res) => {
      setTimeout(() => {
        ref.current = null
      }, 1000)
      router.push('/login')
    })
  }, [mutateAsync, router, accessTokenFromUrl, refreshTokenFromUrl])

  return <div>Log out ....</div>
}

export default LogoutPage
