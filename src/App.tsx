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
      style={{ width: '100%', height: '200px', border: 'none' }}
      title="Secure Payment Form"
      srcDoc={`
        <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        </head>
        <body>
          <h1>Yo</h1>
        </body>
        </html>
      `}
    />
  );
};

function App() {
  const handlePaymentSubmit = (data: { cardNumber: string; expiryDate: string }) => {
    console.log('Payment data received:', data);
  };

  return (
    <div>
      <h1>YDKK</h1>
      <SecurePaymentForm onSubmit={handlePaymentSubmit} />
    </div>
  );
}

export default App