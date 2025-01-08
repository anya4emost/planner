export const parseHeadersSetCookie = (
  headersSetCookie: string
): {
  accessTokenValue: string;
  accessTokenPath: string;
  accessTokenSameSite: string;
  refreshTokenValue: string;
  refreshTokenPath: string;
  refreshTokenSameSite: string;
    } => {
    const tokenArray = headersSetCookie?.split(", ");
    const accessToken = tokenArray[0].split("; ");
    const refreshToken = tokenArray[1].split("; ");
    const accessTokenValue = accessToken[0].split("=")[1];
    const accessTokenPath = accessToken[1].split("=")[1];
    const accessTokenSameSite = accessToken[2].split("=")[1];
    const refreshTokenValue = refreshToken[0].split("=")[1];
    const refreshTokenPath = refreshToken[1].split("=")[1];
    const refreshTokenSameSite = refreshToken[2].split("=")[1];
  return {
    accessTokenValue,
    accessTokenPath,
    accessTokenSameSite,
    refreshTokenValue,
    refreshTokenPath,
    refreshTokenSameSite,
  };
};
