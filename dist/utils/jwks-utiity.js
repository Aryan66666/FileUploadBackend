"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCognitoJwt = verifyCognitoJwt;
const jose_1 = require("jose");
const jwksUri = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`;
const JWKS = (0, jose_1.createRemoteJWKSet)(new URL(jwksUri));
async function verifyCognitoJwt(token) {
    const { payload } = await (0, jose_1.jwtVerify)(token, JWKS, {
        issuer: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
        audience: process.env.COGNITO_CLIENT_ID,
    });
    return payload;
}
