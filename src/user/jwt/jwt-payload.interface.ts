export interface JwtPayload {
  email: string;
  username: string;
}

/*
Payload

The second part of the token is the payload, which contains the claims. 
Claims are statements about an entity (typically, the user) and additional data. 
There are three types of claims: registered, public, and private claims.

https://jwt.io/introduction
*/