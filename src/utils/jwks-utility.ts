import { createRemoteJWKSet, jwtVerify } from "jose";

const jwksUri = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`;

const JWKS = createRemoteJWKSet(new URL(jwksUri));

export async function verifyCognitoJwt(token: string) {
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
    audience: process.env.COGNITO_CLIENT_ID,
  });
  return payload;
}
