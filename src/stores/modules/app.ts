import { ALL_CATEGORY_ITEM } from '@/constants'
import { defineStore } from 'pinia'
import { useNavbarStore } from './navigationbar'

export const useAppStore = defineStore('app', () => {
  const navbar = useNavbarStore()

  const currentCategory = ref(ALL_CATEGORY_ITEM)
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

  return {
    currentCategory,
    changeCurrentCategory,
    currentCategoryIndex
  }
})
