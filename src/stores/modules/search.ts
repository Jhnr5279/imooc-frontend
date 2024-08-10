import { defineStore } from 'pinia'

export const useSearchStore = defineStore(
  'search',
  () => {
    const searchHistory = ref<string[]>([])
    const addHistory = (newHistory: string) => {
      const findIndex = searchHistory.value.findIndex(
        (item) => item === newHistory
      )
      if (findIndex !== -1) {
        // 如果有重复的，则删除重复的，再添加到最前面
        searchHistory.value.splice(findIndex, 1)
      }
      searchHistory.value.unshift(newHistory)
    }

    const deleteHistory = (index: number) => {
      searchHistory.value.splice(index, 1)
    }

    const clearHistory = () => {
      searchHistory.value = []
    }

    return {
      searchHistory,
      addHistory,
      deleteHistory,
      clearHistory
    }
  },
  { persist: true }
)
