'use client'
import React from "react";
import { Provider, useAtomValue } from 'jotai'
import { jotaiStore, subscriptionAtom } from "./jotai";


const SecurePaymentForm = () => {
  const onSubmit = useAtomValue(subscriptionAtom)
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {

    const handleMessage = (event: MessageEvent) => {
      // TODO: Remove this hard-coding
      if (event.origin === 'http://localhost:3000') {
        if(onSubmit) {
          onSubmit.subscribe(event.data);
        }
    
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSubmit]);

  // TODO: Remove this hard-coding
  return (
    <iframe
      ref={iframeRef}
      style={{ width: '100%', height: '100%', border: 'none' }}
      title="Secure Payment Form"
      src="http://localhost:3000/?clientId=4fa7fa681e31c2bf513bb838a691d533d219fc53957e75d1ff422fcfe6dcb057&sessionToken=f3c1e979a06646f13a67dc43e8.1b35cabe1b8659956e99604197caaa4c&iv=32dc557333579c4a9d209f533a150d0e&mode=dev"
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