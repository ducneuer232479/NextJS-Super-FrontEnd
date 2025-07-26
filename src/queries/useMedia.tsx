import { mediaApiRequest } from '@/apiRequests/medai'
import { useMutation } from '@tanstack/react-query'

export const useUploadMediaMutation = () =>
  useMutation({
    mutationFn: mediaApiRequest.upload
  })
