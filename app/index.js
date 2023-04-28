import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { exchangeCodeAsync, makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function App() {

  // Endpoint
  const discovery = useAutoDiscovery('https://login.microsoftonline.com/1379b589-a7ee-42f9-b11e-9d9fc572a47b/v2.0');
  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '5bf8830c-a978-40c3-b1a1-9a6d780a43f9',
      scopes: ['api://b6836bfb-ccd0-4df3-8ca9-84991031165c/api.konserwator'],
      redirectUri: makeRedirectUri({
        scheme: 'exp://192.168.1.23:19000'
      }),
    },
    discovery
  );

  React.useEffect(() => {
    console.log('tutaj')
    if(response && 'params' in response){
      console.log('tutaj2')
      if(response.params && 'code' in response.params){
        console.log('tutaj3');
        (async function getToken() {
          console.log('tutaj4')
          try {
            const {accessToken} = await exchangeCodeAsync({
                code: response.params.code,
                clientId: '5bf8830c-a978-40c3-b1a1-9a6d780a43f9',
                redirectUri: makeRedirectUri({
                  scheme: 'exp://192.168.1.23:19000'
                }),
                scopes: ['api://b6836bfb-ccd0-4df3-8ca9-84991031165c/api.konserwator'],
                grant_type: "authorization_code",
                extraParams: {
                  code_verifier: request?.codeVerifier,
                }
            }, {
              tokenEndpoint: 'https://login.microsoftonline.com/1379b589-a7ee-42f9-b11e-9d9fc572a47b/oauth2/v2.0/token'
            })
            // console.log(accessToken);
          } catch(e){
            console.log(e)
          }
        })()
      }
    }
  })

  // console.log(request)
  
  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}