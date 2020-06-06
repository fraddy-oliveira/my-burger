export const updateStorage = details => {
  try {
    Object.keys(details).map(item => {
      typeof item === 'string' &&
        item.trim() &&
        localStorage.setItem(item, details[item]);
      return true;
    });
  } catch (error) {
    console.log(' update storage error', error);
    return false;
  }
  return true;
};

export const unsetStorage = items => {
  try {
    Array.isArray(items) &&
      items.map(item => {
        localStorage.removeItem(item);
        return true;
      });
    typeof items === 'string' && items.trim() && localStorage.removeItem(items);
  } catch (error) {
    console.log(' unset storage error', error);
    return false;
  }
  return true;
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
  return unsetStorage(Object.keys(getUserStorage()));
};
