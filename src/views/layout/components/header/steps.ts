import type { DriveStep } from 'driver.js'

export default [
  {
    // 在哪个元素中高亮
    element: '.guide-home',
    // 配置对象
    popover: {
      // 标题
      title: 'logo',
      // 描述
      description: '点击可返回首页',
      side: 'bottom'
    }
  },
  {
    element: '.guide-search',
    popover: {
      title: '搜索',
      description: '搜索您期望的图片'
    }
  },
  {
    element: '.guide-theme',
    popover: {
      title: '风格',
      description: '选择一个您喜欢的风格'
    }
  },
  {
    element: '.guide-my',
    popover: {
      title: '账户',
      description: '这里标记了您的账户信息'
    }
  },
  {
    element: '.guide-start',
    popover: {
      title: '引导',
      description: '这里可再次查看引导信息'
    }
  },
  {
    element: '.guide-feedback',
    popover: {
      title: '反馈',
      description: '您的任何不满都可以在这里告诉我们'
    }
  }
] as DriveStep[]
