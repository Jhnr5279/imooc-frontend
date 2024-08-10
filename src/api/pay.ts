import request from '@/utils/request'

/**
 * 获取 VIP 支付数据
 */
export const getVipPayList = () => {
  return request<VipListType[]>({
    url: '/user/vip/pay/list'
  })
}

/**
 * 支付宝下单
 */
export const getAliPay = (
  subject: string,
  totalAmount: string,
  body: string,
  isMobile: boolean
) => {
  return request<{ encodeURI: string }>({
    url: '/user/alipay',
    params: {
      subject,
      totalAmount,
      body,
      isMobile
    }
  })
}

/**
 * 获取 VIP 支付数据
 */
export const getPayResult = (out_trade_no: any) => {
  return request({
    url: '/sys/pay/result',
    params: {
      out_trade_no
    }
  })
}
