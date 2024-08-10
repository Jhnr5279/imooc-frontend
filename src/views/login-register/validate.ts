type fn = (val: any) => string | boolean
export const validateUsername: fn = (val): string | boolean => {
  if (!val) return '请输入用户名'
  if (val.length < 3 || val.length > 12) return '用户名长度在3到12之间'
  return true
}

export const validatePassword: fn = (val): string | boolean => {
  if (!val) return '请输入密码'
  if (val.length < 6 || val.length > 18) return '密码长度在6到18之间'
  return true
}

export const validateConfirmPassword: any = (
  val: string,
  passowrd: string[]
) => {
  if (val !== passowrd[0]) return '两次密码不一致'
  return true
}
