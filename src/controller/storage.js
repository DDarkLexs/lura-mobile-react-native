import AsyncStorage from '@react-native-async-storage/async-storage'


export class LocalAccount {
  constructor(){
    this.account = 'CONTA'
    this._token = 'TOKEN'
    this._fingerPrint = 'FINGER_PRINT_ID'
  } 

  getAccount() {
    return new Promise(async (resolve,reject) => {
      try {
        const response = await AsyncStorage.getItem(this.account)
        if(!response){
          resolve(response)
        } else {
          resolve(JSON.parse(response))
        }
        } catch (error) {
          reject(error)
        }
      })
  }
  storeAccount(accountData) {
    return new Promise(async (resolve,reject) => {
      try {
        await AsyncStorage.setItem(this.account,
          JSON.stringify(accountData))
          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
  }
  async removeAccount(){
   AsyncStorage.removeItem(this.account) 
   return true
  }
  storeToken(token) {
    return new Promise(async (resolve,reject) => {
      try {
        await AsyncStorage.setItem(this._token,
          JSON.stringify(token))
          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
  }

  getFingerPrint() {
    return new Promise(async (resolve,reject) => {
      try {
        const response = await AsyncStorage.getItem(this._fingerPrint)
        if(response){
          resolve(response)
        } else {
          reject(response)
        }
        } catch (error) {
          reject(error)
        }
      })
  }
  removeFingerPrint() {
    return new Promise(async (resolve,reject) => {
      try {
         await AsyncStorage.removeItem(this._fingerPrint)
          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
  }

  storeFingerPrint(id_usuario) {
    return new Promise(async (resolve,reject) => {
      try {
        
        await AsyncStorage.setItem(this._fingerPrint, JSON.stringify(id_usuario))
          resolve(true)
        } catch (error) {
          reject(error)
        }
      })
  }




  getToken() {
    return new Promise(async (resolve,reject) => {
      try {
        const response = (await AsyncStorage.getItem(this._token))
          resolve(response)
        } catch (error) {
          reject(error)
        }
      })
  }
}