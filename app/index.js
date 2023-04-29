import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { exchangeCodeAsync, makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import { Button, SafeAreaView } from 'react-native';
import {Stack, useRouter} from 'expo-router'
import {Specification} from '../components/Specification'
import {COLORS} from '../constants'

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [accessToken, setAccesToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const router = useRouter();

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
    if(response && 'params' in response){
      if(response.params && 'code' in response.params){
        (async function getToken() {
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
            setAccesToken(accessToken);
          } catch(e){
            console.log(e)
          }
        })()
      }
    }
  })

  // console.log(request)
  
  return (
    <SafeAreaView >
      <Stack.Screen
        options={{
          headerStyle: {backgroundColor: COLORS.lightwhite}
        }}
      />
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
        />
      </SafeAreaView>
  );
}