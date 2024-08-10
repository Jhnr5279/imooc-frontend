declare interface RequestType {
  success: boolean
  code: number
  data: any
  message: string
}

declare interface CategoryApiType {
  categorys: CategoryDataType[]
}

declare interface CategoryDataType {
  id: string
  name: string
  col: number
  urlname: string
}

declare interface PexelsListApiType {
  list: PexelsDataType[]
  total: number
  page: number
  size: number
}

declare interface PexelsDataType extends Record<string, string | number> {
  _id: string
  photoLink: string
  photo: string
  authorLike: string
  avatar: string
  author: string
  photoDownLink: string
  id: string
  title: string
  photoWidth: number
  photoHeight: number
  photoType: string
  __v: number
  _style?: {
    top: number | string
    left: number | string
  }
}

declare interface SearchHintApiType {
  total: number
  result: string[]
}

declare interface ThemesApiType {
  themes: ThemeType[]
}
declare interface ThemeType {
  id: string
  photo: string
  title: string
}

declare interface PexelType {
  tags: string[]
  _id: string
  photoLink: string
  photo: string
  authorLike: string
  avatar: string
  author: string
  photoDownLink: string
  id: string
  title: string
  photoWidth: number
  photoHeight: number
  photoType: string
  __v: number
}

declare interface LoginUserApiType {
  code: number
  token: string
}

declare interface UserInfoApiType {
  qqOpenId: string
  wxOpenId: string
  nickname: string
  title: string
  company: string
  homePage: string
  introduction: string
  vipLevel: number
  regTime: string
  avatar: string
  outTradeNo: string
  payResult: boolean
  _id: string
  username: string
  __v: number
}

declare interface VipListType {
  desc: string
  id: number
  isHot: boolean
  oldPrice: string
  price: string
  title: string
}
