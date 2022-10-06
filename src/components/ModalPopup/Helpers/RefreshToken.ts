import apiCallFn from "../../../hooks/apiCallFn";

const refresh = {
  refresh_token: localStorage.getItem("refreshToken"),
};
export const refreshTokenFn = () =>
  apiCallFn(
    "http://api.ultimate.systems/public/index.php/api/v1/auth/token/refresh",
    refresh,
    "POST"
  ).then((data) => {
    localStorage.clear();
    localStorage.setItem("refreshToken", data.refresh_token);
    document.cookie = data.token;
  });
