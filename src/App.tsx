'use client'
import React, { useEffect, useState } from "react";
import { Provider, useAtomValue } from 'jotai'
import { jotaiStore, sdkAtom, subscriptionAtom } from "./jotai";
import { EncrptedData, generateSecureToken } from "./utils";


const SecurePaymentForm = () => {
  const onSubmit = useAtomValue(subscriptionAtom)
  const sdkData = useAtomValue(sdkAtom)
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const [token, setToken] = useState<EncrptedData | null>(null)

  React.useEffect(() => {

    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://rootpay-client-v5zx.vercel.app') {
        if(onSubmit) {
          onSubmit.subscribe(event.data);
        }
    
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSubmit]);

  useEffect(() => {
    const computeToken = async () => {
      if(!sdkData?.clientSecret) return;

      const tokenData = await generateSecureToken(sdkData?.clientSecret)
      setToken(tokenData)
    }

    computeToken()
  }, [sdkData])


  if(!sdkAtom || token === null) {
    return null;
  }

  const url = `https://rootpay-client-v5zx.vercel.app/?clientId=${sdkData?.clientId}&sessionToken=${token?.token}&iv=${token?.iv}&mode=${sdkData?.mode}`

  return (
    <iframe
      ref={iframeRef}
      style={{ width: '100%', height: '100%', border: 'none' }}
      title="Secure Payment Form"
      src={url}
    />
  );
};

function App() {
  return (
    <Provider store={jotaiStore}>
      <div style={{width: "100%", height: "100%"}}>
        <SecurePaymentForm />
      </div>
    </Provider>
  );
}

export default App