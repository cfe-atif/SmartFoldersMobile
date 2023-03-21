export const validateEmail = email => {
  const re = /^[^\s]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

export const validatePassword = password => {
  const re =
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?.,./{}|\":<>\[\]\\\' ~_]).{8,}/;
  return re.test(password);
};
