<script lang="ts">
const TYPE_TEXT = 'text'
const TYPE_TEXTAREA = 'textarea'
</script>
<script setup lang="ts">
defineProps({
  type: {
    type: String as () => 'text' | 'textarea',
    default: TYPE_TEXT,
    validator(value: string) {
      const arr = [TYPE_TEXT, TYPE_TEXTAREA]
      const result = arr.includes(value)
      if (!result) {
        throw new Error(`type 的值必须在可选范围内 [${arr.join('、')}]`)
      }
      return result
    }
  },
  max: {
    type: [String, Number]
  }
})
// 输入的字符
const text = defineModel({ required: true, type: String })

// 计算输入的字符长度
const currentNumber = computed(() => text.value.length)
</script>

<template>
  <div class="relative leading-[0px]">
    <input
      v-if="type === TYPE_TEXT"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
      type="text"
      v-model="text"
      :maxlength="max"
    />
    <textarea
      v-if="type === TYPE_TEXTAREA"
      v-model="text"
      :maxlength="max"
      rows="5"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
    ></textarea>
    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{ 'text-red-700': currentNumber === parseInt(max as string) }"
      >{{ currentNumber }} / {{ max }}</span
    >
  </div>
</template>

<style lang="scss" scoped></style>
