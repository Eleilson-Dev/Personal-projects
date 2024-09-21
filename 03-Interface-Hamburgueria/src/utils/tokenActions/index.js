export const saveToken = (keyName, token) =>
  localStorage.setItem(keyName, token);

export const getToken = (keyName) => localStorage.getItem(keyName);

export const removeToken = (keyName) => localStorage.removeItem(keyName);
