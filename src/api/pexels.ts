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

/**
 * 获取搜索提示
 */
export const getHint = (q: string) => {
  return request<SearchHintApiType>({
    url: '/pexels/hint',
    params: {
      q
    }
  })
}

/**
 * 获取热门主题
 */
export const getTheme = () => {
  return request<ThemesApiType>({
    url: '/pexels/themes'
  })
}

/**
 * 获取热门主题
 */
export const getPexelById = (id: string) => {
  return request<PexelType>({
    url: `/pexels/${id}`
  })
}
