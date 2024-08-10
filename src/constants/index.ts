// 判断移动端宽度
export const PC_DEVICE_WIDTH = 1280

// category 的本地构建数据
export const ALL_CATEGORY_ITEM = {
  id: 'all',
  name: '全部'
} as CategoryDataType

// category 的基本数据构建
export const CATEGORY_BASE_DATA = [
  ALL_CATEGORY_ITEM,
  { id: 'web_app_icon', name: 'UI/UX' },
  { id: 'design', name: '平面' },
  { id: 'illustration', name: '插画/漫画' },
  { id: 'photography', name: '摄影' },
  { id: 'games', name: '游戏' },
  { id: 'anime', name: '动漫' },
  {
    id: 'industrial_design',
    name: '工业设计'
  },
  {
    id: 'industrial_design',
    name: '建筑设计'
  },
  {
    id: 'industrial_design',
    name: '人文艺术'
  },
  {
    id: 'industrial_design',
    name: '家居/家装'
  }
] as CategoryDataType[]

export enum THEME_TYPE {
  // 极简白
  THEME_LIGHT = 'THEME_LIGHT',
  // 极夜黑
  THEME_DARK = 'THEME_DARK',
  // 跟随系统
  THEME_SYSTEM = 'THEME_SYSTEM'
}

export const LOGIN_TYPE_USERNAME = 'username'
export const LOGIN_TYPE_QQ = 'qq'

export const LOGIN_TYPE_OAUTH_NO_REGISTER_CODE = 204

// 兔小巢反馈地址
export const FEEDBACK_URL = 'https://txc.qq.com/products/664067'
