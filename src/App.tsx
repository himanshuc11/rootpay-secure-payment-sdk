import React from "react";
interface SecureFormProps {
  onSubmit: (data: { cardNumber: string; expiryDate: string }) => void;
}

const SecurePaymentForm: React.FC<SecureFormProps> = ({ onSubmit }) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'trusted-payment-domain') {
        onSubmit(event.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSubmit]);

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
  const handlePaymentSubmit = (data: { cardNumber: string; expiryDate: string }) => {
    console.log('Payment data received:', data);
  };

  return (
    <div style={{width: "100%", height: "100%"}}>
      <SecurePaymentForm onSubmit={handlePaymentSubmit} />
    </div>
  );
}

export default App