import renderSdk from './main-react';
import { Logger } from './utils/logger';
import { jotaiStore, subscriptionAtom } from './jotai';
export class RootPaySDK {
    constructor(config) {
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        if (RootPaySDK.initializedCount !== 0) {
            Logger.throwError("Cannot have 2 instances of the SDK");
        }
        this.logger = new Logger(config.mode);
        this.config = config;
        RootPaySDK.initializedCount += 1;
        this.logger.info("Initialized Rootpay SDK");
    }
    init() {
        this?.logger?.info("Trying to render Rootpay SDK");
        const rootElement = document.getElementById(this.config.rootId);
        if (!rootElement) {
            Logger.throwError(`Element with ID "${this.config.rootId}" not found.`);
        }
        renderSdk(rootElement);
        this?.logger?.info("Rendered Rootpay SDK");
        if (this.config.theme) {
            rootElement.style.color = this.config.theme.primaryColor;
            rootElement.style.backgroundColor = this.config.theme.secondaryColor;
            this?.logger?.info(`Applied Themes colors ${JSON.stringify(this.config.theme)}`);
        }
    }
    subscribe(callback) {
        jotaiStore.set(subscriptionAtom, { subscribe: callback });
        const currentValue = jotaiStore.get(subscriptionAtom);
        console.log('::CUrrent CAL', currentValue, callback);
        console.log('::SETTING STORE', callback);
    }
}
Object.defineProperty(RootPaySDK, "initializedCount", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 0
});
