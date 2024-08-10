import { ALL_CATEGORY_ITEM } from '@/constants'
import { defineStore } from 'pinia'
import { useNavbarStore } from './navigationbar'
import { isMobileTerminal } from '@/utils/flexibel'
import type { routerType } from '@/libs/m-transition-router-view/index.vue'

export const useAppStore = defineStore('app', () => {
  const navbar = useNavbarStore()

  // 分类和列表联动数据
  const currentCategory = ref(ALL_CATEGORY_ITEM)
  // 更改分类
  const changeCurrentCategory = (newCategory: CategoryDataType) => {
    currentCategory.value = newCategory
  }

  /**
   *  category 选中项的下标
   * @returns
   */
  const currentCategoryIndex = () => {
    return navbar.categoryData.findIndex((item) => {
      return item.id === currentCategory.value.id
    })
  }

  // 搜索和列表联动数据
  const searchText = ref('')
  const changeSearchText = (newText: string) => {
    searchText.value = newText
  }

  // 路由跳转方式
  const routerType = ref<routerType>('none')
  const getRouterType = computed(() => {
    if (!isMobileTerminal.value) {
      return 'none'
    }
    return routerType.value
  })

  return {
    currentCategory,
    changeCurrentCategory,
    currentCategoryIndex,
    searchText,
    changeSearchText,
    routerType,
    getRouterType
  }
})
