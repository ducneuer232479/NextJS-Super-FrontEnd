import { useEffect } from 'react'
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage
} from '@/lib/utils'
import { usePathname } from 'next/navigation'
import jwt from 'jsonwebtoken'
import authApiRequest from '@/apiRequests/auth'

const UNAUTHENTICATED_PATH = ['/login', '/register', '/refresh-token']

const RefreshToken = () => {
  const pathname = usePathname()

  useEffect(() => {
    if (UNAUTHENTICATED_PATH.includes(pathname)) return
    let interval: any = null
    const checkRefreshToken = async () => {
      const accessToken = getAccessTokenFromLocalStorage()
      const refreshToken = getRefreshTokenFromLocalStorage()

      if (!accessToken || !refreshToken) return

      const decodedAccessToken = jwt.decode(accessToken) as {
        exp: number
        iat: number
      }
      const decodedRefreshToken = jwt.decode(refreshToken) as {
        exp: number
        iat: number
      }
      const now = Math.round(new Date().getTime() / 1000)

      if (decodedRefreshToken.exp <= now) return

      if (
        decodedAccessToken.exp - now <
        (decodedAccessToken.exp - decodedAccessToken.iat) / 3
      ) {
        try {
          const res = await authApiRequest.refreshToken()
          setAccessTokenToLocalStorage(res.payload.data.accessToken)
          setRefreshTokenToLocalStorage(res.payload.data.refreshToken)
        } catch (error) {
          clearInterval(interval)
        }
      }
    }
    checkRefreshToken()
    const TIMEOUT = 1000
    interval = setInterval(checkRefreshToken, TIMEOUT)

    return () => {
      clearInterval(interval)
    }
  }, [pathname])

  return null
}

export default RefreshToken
