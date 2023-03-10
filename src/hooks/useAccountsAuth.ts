import {
  LIVE_APPS_LOGIN_DETAILS,
  LIVE_APPS_SIGNUP_DETAILS,
  LIVE_APPS_VALIDATE_OTP_DETAILS,
  LIVE_APPS_VALIDATE_OTP_RESPONSE,
} from "src/model";
import { accountsAuthApi } from "src/api/accounts-auth";

// accounts auth - authentication hook for oauth service for live apps applications
// nothing is stored in redux/cookie, every details should be used locally and sent through query params using the redirect url
// in future this logic will be moved to a separate
export const useAccountsAuth = () => {
  async function login(details: LIVE_APPS_LOGIN_DETAILS): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await accountsAuthApi.signinWithLiveApps(details);
        resolve(undefined);
      } catch (err) {
        reject(err);
      }
    });
  }

  function signup(details: LIVE_APPS_SIGNUP_DETAILS): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        // signup to live-apps
        await accountsAuthApi.signupWithLiveApps(details);
        resolve(undefined);
      } catch (err) {
        reject(err);
      }
    });
  }

  function validateOTP(
    details: LIVE_APPS_VALIDATE_OTP_DETAILS
  ): Promise<LIVE_APPS_VALIDATE_OTP_RESPONSE> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await accountsAuthApi.validateOTP(details);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  // function logout({
  //   updateRedux = true,
  // }: USE_AUTH_OPTIONS = {}): Promise<void> {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       await authApi.logout();
  //       deleteCookie(authConfig.tokenAccessor);
  //       deleteCookie(authConfig.refreshTokenAccessor);
  //       window.location.reload();
  //       if (updateRedux) authActions.logout();
  //       resolve();
  //     } catch (err) {
  //       if (updateRedux) authActions.logout();
  //       deleteCookie(authConfig.tokenAccessor);
  //       deleteCookie(authConfig.refreshTokenAccessor);
  //       window.location.reload();
  //       reject(err);
  //     }
  //   });
  // }

  const authUtils = {
    login,
    signup,
    validateOTP,
    // logout,
  };
  return authUtils;
};
