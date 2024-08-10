<script lang="ts">
const EMITS_CLOSE = 'close'
const EMITS_SUCCESS = 'success'

const pcOptions: Cropper.Options = {
  aspectRatio: 1
}
const mobileOptions: Cropper.Options = {
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}
</script>

<script setup lang="ts">
import { putProfile } from '@/api/sys'
import { message } from '@/libs'
import { useUserStore } from '@/stores'
import { isMobileTerminal } from '@/utils/flexibel'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadFile } from './UploadFile'

defineProps({
  blob: {
    type: String,
    required: true
  }
})

const emits = defineEmits([EMITS_CLOSE, EMITS_SUCCESS])

/**
 * 确定按钮点击事件
 */
const loading = ref(false)
const onConfirmClick = () => {
  loading.value = true
  cropper.getCroppedCanvas().toBlob((blob) => {
    onCosPut(blob!)
  })
}

const onCosPut = (blob: Blob) => {
  const suffix = blob.type.split('/')
  const fileName = `imooc-img/${Date.now()}.${suffix[suffix.length - 1]}`
  uploadFile(fileName, blob, onUploadErr, onChangeProfile)
}

const onUploadErr = (err: any) => {
  loading.value = false
  console.error(err)
  message('error', '腾讯云cos上传失败')
}

/**
 * 图片上传成功 更新用户头像
 */
const userStore = useUserStore()
const onChangeProfile = async (avatar: string) => {
  loading.value = true
  userStore.userInfo.avatar = `http://${avatar}`
  await putProfile(userStore.userInfo)
  message('success', '头像更新成功')
  loading.value = false
  close()
}

/**
 * 关闭事件
 */
const close = () => {
  emits(EMITS_CLOSE)
}

const imageTarget = ref<HTMLImageElement | null>(null)
let cropper: Cropper
onMounted(() => {
  cropper = new Cropper(
    imageTarget.value!,
    isMobileTerminal.value ? mobileOptions : pcOptions
  )
})
</script>
<template>
  <div class="overflow-auto flex flex-col items-center">
    <m-svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-3 h-3 p-0.5 m-1 ml-auto"
      fillClass="fill-zinc-900 dark:fill-zinc-200 "
      @click="close"
    ></m-svg-icon>

    <img class="" ref="imageTarget" :src="blob" />

    <m-button
      class="mt-4 w-[80%] xl:w-1/2"
      @click="onConfirmClick"
      :loading="loading"
      >确定</m-button
    >
  </div>
</template>
<style lang="scss" scoped></style>
