import { getAliPay } from '@/api/pay'
import { isMobileTerminal } from './flexibel'

export const alipay = async (title: string, desc: string) => {
  const { encodeURI } = await getAliPay(
    title,
    '0.01',
    desc,
    isMobileTerminal.value
  )
  window.location.href = decodeURIComponent(encodeURI)
}
