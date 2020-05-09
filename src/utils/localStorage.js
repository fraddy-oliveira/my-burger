export const updateStorage = details => {
  Object.keys(details).map(item => {
    typeof item === 'string' &&
      item.trim() &&
      localStorage.setItem(item, details[item]);
  });
};

export const unsetStorage = items => {
  Array.isArray(items) &&
    items.map(item => {
      localStorage.removeItem(item);
    });
  typeof items === 'string' && items.trim() && localStorage.removeItem(items);
};

export const getUserStorage = () => {
  const userDetails = {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    userId: localStorage.getItem('userId')
      ? localStorage.getItem('userId')
      : '',
    expiresDate: localStorage.getItem('expiresDate')
      ? localStorage.getItem('expiresDate')
      : 0,
  };
  return userDetails;
};

export const resetUserStorage = () => {
  unsetStorage(Object.keys(getUserStorage()));
};
