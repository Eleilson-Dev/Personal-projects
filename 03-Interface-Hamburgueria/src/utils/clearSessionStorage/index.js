export const clearSessionStorage = (location) => {
  if (
    !['/validate/recover', '/validate', '/reset/password'].includes(
      location.pathname
    )
  ) {
    sessionStorage.clear();
  }
};
