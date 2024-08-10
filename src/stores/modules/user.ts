import { getProfile, loginUser, registerUser } from '@/api/sys'
import { defineStore } from 'pinia'
import md5 from 'md5'
import { message } from '@/libs'

export const useUserStore = defineStore(
  'user',
  () => {
    /**
     * 登录
     */
    const token = ref('')
    const useLoginUser = async (data: loginUserType) => {
      const { password } = data

      const res = await loginUser({
        ...data,
        password: password ? md5(password) : ''
      })
      if (res.code === 204) {
        return res.code
      }
      token.value = res.token
      getUserInfo()
    }

    // 获取用户信息
    const userInfo = ref({} as UserInfoApiType)
    const getUserInfo = async () => {
      const res = await getProfile()
      userInfo.value = res
      message(
        'success',
        `欢迎您 ${
          res.vipLevel
            ? '尊贵的 VIP' + res.vipLevel + ' 用户 ' + res.nickname
            : res.nickname
        } `,
        6000
      )
    }

    // 退出登录
    const logout = () => {
      token.value = ''
      userInfo.value = {} as UserInfoApiType
      location.reload()
    }

    // 用户注册
    const register = async (data: registerUserType) => {
      const { password } = data
      return await registerUser({
        ...data,
        password: password ? md5(password) : ''
      })
    }

    // 更新用户信息
    const setUserInfo = (data: UserInfoApiType) => {
      userInfo.value = { ...data }
    }

    return {
      token,
      useLoginUser,
      userInfo,
      logout,
      register,
      setUserInfo,
      getUserInfo
    }
  },
  {
    persist: true
  }
)
