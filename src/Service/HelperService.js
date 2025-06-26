export const GetHeader = () => {
  const accessToken = JSON.parse(localStorage.getItem("token"));
  console.log(accessToken, "token");
  return accessToken;
};
