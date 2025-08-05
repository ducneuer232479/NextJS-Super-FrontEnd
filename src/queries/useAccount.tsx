import accountApiRequest from '@/apiRequests/account'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useAccountMe = () =>
  useQuery({
    queryKey: ['account-me'],
    queryFn: accountApiRequest.me
  })

export const useUpdateMeMutation = () =>
  useMutation({
    mutationFn: accountApiRequest.updateMe
  })

export const useChangePasswordMutation = () =>
  useMutation({
    mutationFn: accountApiRequest.changePasswordV2
  })
