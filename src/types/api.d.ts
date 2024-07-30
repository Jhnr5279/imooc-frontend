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
