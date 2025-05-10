'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { Provider, useAtomValue } from 'jotai';
import { jotaiStore, sdkAtom, subscriptionAtom } from "./jotai";
import { generateSecureToken } from "./utils";
const SecurePaymentForm = () => {
    const onSubmit = useAtomValue(subscriptionAtom);
    const sdkData = useAtomValue(sdkAtom);
    const iframeRef = React.useRef(null);
    const [token, setToken] = useState(null);
    React.useEffect(() => {
        const handleMessage = (event) => {
            // TODO: Remove this hard-coding
            if (event.origin === 'http://localhost:3000') {
                if (onSubmit) {
                    onSubmit.subscribe(event.data);
                }
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onSubmit]);
    useEffect(() => {
        const computeToken = async () => {
            if (!sdkData?.clientSecret)
                return;
            const tokenData = await generateSecureToken(sdkData?.clientSecret);
            setToken(tokenData);
        };
        computeToken();
    }, [sdkData]);
    if (!sdkAtom || token === null) {
        return null;
    }
    const url = `http://localhost:3000/?clientId=${sdkData?.clientId}&sessionToken=${token?.token}&iv=${token?.iv}&mode=${sdkData?.mode}`;
    // TODO: Remove this hard-coding
    return (_jsx("iframe", { ref: iframeRef, style: { width: '100%', height: '100%', border: 'none' }, title: "Secure Payment Form", src: url }));
};
function App() {
    return (_jsx(Provider, { store: jotaiStore, children: _jsx("div", { style: { width: "100%", height: "100%" }, children: _jsx(SecurePaymentForm, {}) }) }));
}
export default App;
