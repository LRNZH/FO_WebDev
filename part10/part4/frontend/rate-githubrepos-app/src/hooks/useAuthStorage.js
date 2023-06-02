import { createContext, useContext } from 'react';

export const AuthStorageContext = createContext();

export const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};
