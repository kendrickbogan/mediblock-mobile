import EncryptedStorage from "react-native-encrypted-storage"

import { User } from "./AuthContext"

const USER_STORAGE_KEY = "mediblock:userStorageKey"

const setStoredUser = async (user: User): Promise<void> => {
  const stringifiedUser = JSON.stringify(user)
  await EncryptedStorage.setItem(USER_STORAGE_KEY, stringifiedUser)
}

const getStoredUser = async (): Promise<User | null> => {
  const stringifiedUser = await EncryptedStorage.getItem(USER_STORAGE_KEY)

  if (stringifiedUser) {
    const user = JSON.parse(stringifiedUser)
    return user
  } else {
    return null
  }
}

const clearStorage = async (): Promise<void> => {
  await EncryptedStorage.clear()
}

export default { setStoredUser, getStoredUser, clearStorage }
