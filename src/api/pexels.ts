import request from '@/utils/request'

export type pexelsParamsType = {
  page?: number
  size?: number
  categoryId?: string
  searchText?: string
}
export const getPexelsList = (params: pexelsParamsType) => {
  return request<PexelsListApiType>({
    url: '/pexels/list',
    params
  })
}
