import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const CLIENT_ID = process.env.COGNITO_CLIENT_ID!;

export async function cognitoSignUp(email: string, password: string, name: string) {
  return cognitoClient.send(
    new SignUpCommand({
      ClientId: CLIENT_ID,
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
      ClientId: CLIENT_ID,
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
