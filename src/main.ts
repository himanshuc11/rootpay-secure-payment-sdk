import type { SDKConfig, Result } from '../types/rootpay-secure-payment-sdk';
import { Logger } from './utils/logger';

export class RootPaySDK {
    private static instance: RootPaySDK | null = null;
    private config: SDKConfig;
    private logger: Logger | null = null

    public static getInstance(config?: SDKConfig): RootPaySDK {
        if (!RootPaySDK.instance) {
            if (!config) {
                throw new Error('Config is required when creating the first instance');
            }
            RootPaySDK.instance = new RootPaySDK(config);
        }
        return RootPaySDK.instance;
    }

    private constructor(config: SDKConfig) {
        this.logger = new Logger(config.mode)
        this.config = config;

        this.logger.info("Initialized RootPay SDK")
    }

    init(): void {
        const rootElement = document.getElementById(this.config.rootId);
        if (!rootElement) {
            throw new Error(`Element with ID "${this.config.rootId}" not found.`);
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
