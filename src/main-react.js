import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
function renderSdk(elem) {
    const root = createRoot(elem).render(_jsx(StrictMode, { children: _jsx(App, {}) }));
    return root;
}
export default renderSdk;
