import axios from "axios";

export const getUserType = (email) => (
  axios.get(`${process.env.API_BASE_URL}api/v1/Auth/getUserType/?email=${email}`)
    .then((response) => {
      if (response.data) {
        const { success, errors } = response.data;

        if (success === false) {
          if (errors.indexOf('invalid_email') !== -1) {
            throw new Error('Invalid email');
          } else {
            throw new Error(errors);
          }
        } else {
          const { data } = response.data;
          const { userLoginType } = data;
          if (userLoginType) {
            return userLoginType;
          }
          return '';
        }
      }
    })
)

export const logInAPI = (email, password) =>
  axios
    .post(process.env.API_BASE_URL + "api/v1/Auth", {
      email,
      password
    })
    .then(response => {
      if (response.data) {
        const { success, errors } = response.data;

        if (success === false) {
          if (errors.indexOf("user_does_not_exist") !== -1) {
            throw new Error("User does not exist");
          } else {
            throw new Error(errors);
          }
        } else {
          const { isPasswordEntered, token, roles = [] } = response.data;

          if (isPasswordEntered && token && roles.length > 0) {
            return token;
          } else if (!isPasswordEntered) {
            throw new Error("Wrong Password");
          } else {
            throw new Error("not valid details");
          }
        }
      } else {
        throw new Error("not valid details");
      }
    });

export const registerAPI = (host, email, name, password) =>
  axios
    .post(process.env.API_BASE_URL + "api/v1/Publishers/register", {
      adminEmail: email,
      host,
      email,
      name,
      password
    })
    .then(response => {
      if (response.data) {
        const { data, success, errors } = response.data;

        if (success) {
          return data;
        } else if (errors) {
          if (
            errors.indexOf("Account already exists") !== -1 ||
            errors.indexOf("account_exists") !== -1
          ) {
            throw new Error("Account already exists");
          } else {
            throw new Error(errors);
          }
        }
      } else {
        throw new Error("not valid details");
      }
    });

export const recoverPasswordAPI = (email, r, s, from) =>
  axios
    .post(process.env.API_BASE_URL + "api/v1/Auth/recoverPassword", {
      email,
      r,
      s,
      from
    })
    .then(response => {
      if (response.data) {
        const { data, success, errors } = response.data;

        if (success) {
          return data;
        } else if (errors) {
          if (errors.indexOf("user_does_not_exist") !== -1) {
            throw new Error("User does not exist");
          } else {
            throw new Error(errors);
          }
        }
      } else {
        throw new Error("not valid details");
      }
    });

export const resetPasswordByKey = (
  email,
  oldPassword,
  newPassword,
  passwordResetKey
) =>
  axios
    .post(process.env.API_BASE_URL + "api/v1/Auth/resetPasswordByKey", {
      email,
      oldPassword,
      newPassword,
      passwordResetKey
    })
    .then(response => {
      if (response.data) {
        const { success, errors } = response.data;

        if (success === false) {
          if (errors.indexOf("user_does_not_exist") !== -1) {
            throw new Error("User does not exist");
          } else {
            throw new Error(errors);
          }
        } else {
          const { isPasswordEntered, token, roles = [] } = response.data;

          if (isPasswordEntered && token && roles.length > 0) {
            return token;
          } else if (!isPasswordEntered) {
            throw new Error("Wrong Password");
          } else {
            throw new Error("not valid details");
          }
        }
      } else {
        throw new Error("not valid details");
      }
    });

export const confirmPublisherEmail = (emailConfirmKey, host) =>
  axios
    .put(process.env.API_BASE_URL + "api/v1/Publishers/confirmEmail", {
      emailConfirmKey,
      host
    })
    .then(response => {
      if (response.data) {
        const { success, errors } = response.data;

        if (success) {
          return true;
        } else if (errors) {
          if (errors.indexOf('key_mismatch') !== -1) {
            throw new Error("Confirmation key is either not valid or has expired.");
          }
          if (errors.indexOf('host_not_found') !== -1) {
            throw new Error("Confirmation host is not found.");
          }
        }
        throw new Error("Validation error, please try again.");
      }
    });
