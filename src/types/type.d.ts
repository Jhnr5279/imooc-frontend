declare interface loginUserType {
  username: string
  password: string
  loginType: 'username' | 'QQ' | 'WX'
  accessToken?: string
  openid?: string
  nickname?: string
  headimgurl?: string
}

declare interface registerUserType {
  username: string
  password: string
  reqType?: 'QQ' | 'WX'
  accessToken?: string
  openid?: string
  nickname?: string
  headimgurl?: string
  figureurl_qq_2?: string
}

declare interface UpUserInfoType {
  nickname: string
  title: string
  company: string
  homePage: string
  introduction: string
  avatar: string
}
