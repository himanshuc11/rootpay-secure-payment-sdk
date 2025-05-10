import type { SDKConfig, Result } from '../types/rootpay-secure-payment-sdk';
import { Logger } from './utils/logger';

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
        const rootElement = document.getElementById(this.config.rootId);
        if (!rootElement) {
            Logger.throwError(`Element with ID "${this.config.rootId}" not found.`);
        }
        rootElement.innerHTML = `<div>RootPay SDK Initialized in ${this.config.mode} mode</div>`;
        if (this.config.theme) {
            rootElement.style.color = this.config.theme.primaryColor;
            rootElement.style.backgroundColor = this.config.theme.secondaryColor;
        }
        if (this.config.mode === "dev") {
            console.log("RootPay SDK initialized with config:", this.config);
        }
    }

    subscribe(callback: (result: Result) => void): void {
        const result: Result = {
            status: "success",
            message: "Done"
        } 
        callback(result)
    }
}
