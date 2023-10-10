import {CognitoUserPool} from "amazon-cognito-identity-js";


const poolData = {
    UserPoolId: 'eu-central-1_hlPzRO12H',
    ClientId: 'ba07ch2i0n53flpf346cji64'
}


export const userPool = new CognitoUserPool(poolData);
