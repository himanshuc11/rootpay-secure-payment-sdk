import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
const SecurePaymentForm = ({ onSubmit }) => {
    const iframeRef = React.useRef(null);
    React.useEffect(() => {
        const handleMessage = (event) => {
            if (event.origin === 'trusted-payment-domain') {
                onSubmit(event.data);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onSubmit]);
    return (_jsx("iframe", { ref: iframeRef, style: { width: '100%', height: '200px', border: 'none' }, title: "Secure Payment Form", srcDoc: `
        <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
        </head>
        <body>
          <h1>Yo</h1>
        </body>
        </html>
      ` }));
};
function App() {
    const handlePaymentSubmit = (data) => {
        console.log('Payment data received:', data);
    };
    return (_jsxs("div", { children: [_jsx("h1", { children: "YDKK" }), _jsx(SecurePaymentForm, { onSubmit: handlePaymentSubmit })] }));
}
export default App;
