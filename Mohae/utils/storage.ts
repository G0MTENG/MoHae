import AsyncStorage from '@react-native-async-storage/async-storage'

type Key = 'ACCESS_TOKEN' | 'REFRESH_TOKEN' | 'EMAIL' | 'PASSWORD'

export const setItem = async (key: Key, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.error(e)
  }
}

export const getItem = async (key: Key) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch (e) {
    console.error(e)
  }
}

export const clearItems = async () => {
  try {
    await AsyncStorage.clear()
  } catch (e) {
    console.error(e)
  }
}
