<template>
  <div>
    <span id="qqLoginBtn" v-show="false"></span>
    <m-svg-icon
      class="w-4 h-4 cursor-pointer"
      name="qq"
      @click="onQQLogin"
    ></m-svg-icon>
  </div>
</template>

<script lang="ts">
// QQ 登录的 URL
const QQ_LOGIN_URL =
  'https://graph.qq.com/oauth2.0/authorize?client_id=101998494&response_type=token&scope=all&redirect_uri=https%3A%2F%2Fimooc-front.lgdsunday.club%2Flogin'
</script>

<script setup lang="ts">
// @ts-nocheck

import { isMobileTerminal } from '@/utils/flexibel'
import { onMounted } from 'vue'
import brodacast from './brodacast'
import { oauthLogin } from './oath'
import { LOGIN_TYPE_QQ } from '@/constants'

// QQ 登录挂起
onMounted(() => {
  QC.Login(
    {
      btnId: 'qqLoginBtn' //插入按钮的节点id
    },
    // 登录成功之后的回调，但是需要注意，这个回调只会在《登录回调页面中被执行》
    // 登录存在缓存，登录成功一次之后，下次进入会自动重新登录（即：触发该方法，所以我们应该在离开登录页面时，注销登录）
    (data: any, opts: any) => {
      QC.Login.signOut() // 注销登录
      // 获取用户信息
      const accessToken = /access_token=((.*))&expires_in/.exec(
        window.location.hash
      )
      const oauthObj = {
        nickname: data.nickname,
        figureurl_qq_2: data.figureurl_qq_2,
        accessToken
      }

      brodacast.send(oauthObj)
      // 移动端没有窗口的概念 无需跨页面数据传输直接执行就可以
      oauthLogin(LOGIN_TYPE_QQ, oauthObj)
      // 5. 在 PC 端下，关闭第三方窗口
      window.close()
    }
  )
})

/**
 * 登录按钮事件
 */
const onQQLogin = () => {
  openQQWindow()
}

/**
 * 处理 QQ 登录视窗
 */

const openQQWindow = async () => {
  window.open(
    QQ_LOGIN_URL,
    'oauth2Login_10609',
    'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes'
  )

  brodacast.wait().then(async (oauthObj) => {
    brodacast.clear()
    // 执行登录操作
    oauthLogin(LOGIN_TYPE_QQ, oauthLogin)
  })
}
</script>
