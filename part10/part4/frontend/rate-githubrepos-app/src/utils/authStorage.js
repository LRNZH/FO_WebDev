import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
    this.accessTokenKey = `${namespace}:accessToken`;
  }

  async getAccessToken() {
    const accessToken = await AsyncStorage.getItem(this.accessTokenKey);
    return accessToken ? JSON.parse(accessToken) : null;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(this.accessTokenKey, JSON.stringify(accessToken));
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(this.accessTokenKey);
  }
}

export default AuthStorage;