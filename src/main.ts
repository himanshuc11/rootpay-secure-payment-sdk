import type { SDKConfig, Result } from '../types/rootpay-secure-payment-sdk';
import renderSdk from './main-react';
import { Logger } from './utils/logger';
import { jotaiStore, sdkAtom, subscriptionAtom } from './jotai';

export class RootPaySDK {
    public static initializedCount = 0;
    private config: SDKConfig;
    private logger: Logger | null = null;

    constructor(config: SDKConfig) {
        if(RootPaySDK.initializedCount !== 0) {
            Logger.throwError("Cannot have 2 instances of the SDK")
        }

        this.logger = new Logger(config.mode);
        this.config = config;

        RootPaySDK.initializedCount += 1;
        this.logger.info("Initialized Rootpay SDK");
    }

    init(): void {
        this?.logger?.info("Trying to render Rootpay SDK");
        const rootElement = document.getElementById(this.config.rootId);
        if (!rootElement) {
            Logger.throwError(`Element with ID "${this.config.rootId}" not found.`);
        }

        renderSdk(rootElement)
        jotaiStore.set(sdkAtom, this.config)
        this?.logger?.info("Rendered Rootpay SDK");

        if (this.config.theme) {
            rootElement.style.color = this.config.theme.primaryColor;
            rootElement.style.backgroundColor = this.config.theme.secondaryColor;
            this?.logger?.info(`Applied Themes colors ${JSON.stringify(this.config.theme)}`);
        }
    }

    subscribe(callback: (result: Result) => void): void {
        jotaiStore.set(subscriptionAtom, { subscribe: callback })
    }
}
