import request from '@/utils/request'

/**
 * 人类行为验证
 */
export const getCaptcha = (data: { behavior: number[] }) => {
  return request<Boolean>({
    url: '/sys/captcha',
    method: 'POST',
    data
  })
}

/**
 * 登录
 */
export const loginUser = (data: loginUserType) => {
  return request<LoginUserApiType>({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 */
export const getProfile = () => {
  return request<UserInfoApiType>({
    url: '/user/profile'
  })
}

/**
 * 注册
 */
export const registerUser = (data: registerUserType) => {
  return request({
    url: '/sys/register',
    method: 'POST',
    data
  })
}

/**
 * 修改用户信息
 */
export const putProfile = (data: UpUserInfoType) => {
  return request({
    url: '/user/profile',
    method: 'PUT',
    data
  })
}
