import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { env } from "./env";

const cognitoClient = new CognitoIdentityProviderClient({
  region: env.awsRegion,
  credentials: {
    accessKeyId: env.awsAccessKeyId,
    secretAccessKey: env.awsSecretAccessKey,
  },
});

export async function cognitoSignUp(email: string, password: string, name: string) {
  return cognitoClient.send(
    new SignUpCommand({
      ClientId: env.cognitoClientId,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "name", Value: name },
      ],
    })
  );
}

export async function cognitoSignIn(email: string, password: string) {
  const res = await cognitoClient.send(
    new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: env.cognitoClientId,
      AuthParameters: { USERNAME: email, PASSWORD: password },
    })
  );
  return res.AuthenticationResult;
}

export async function cognitoGetUser(accessToken: string) {
  const res = await cognitoClient.send(
    new GetUserCommand({ AccessToken: accessToken })
  );
  return res.UserAttributes;
}
