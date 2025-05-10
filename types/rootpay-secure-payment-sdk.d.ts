/**
 * Type definitions for RootPay Secure Payment SDK
 * @module rootpay-secure-payment-sdk
 */

/** Current environment in which code is running. 
 * dev mode gives extra debugging logs, make sure to use production mode on production
 */
export type Mode = "dev" | "production"

/** 
 * Theme configuration options for customizing SDK appearance
 */
export type Theme = {
    /** Primary color used in SDK UI elements */
    primaryColor: string;
    /** Secondary/background color used in SDK UI elements */  
    secondaryColor: string;
}

/**
 * Configuration options required to initialize the SDK
 */
export type SDKConfig = {
    /** Root Credit clientId for authentication */
    clientId: string;
    /** Root Credit clientSecret for authentication */
    clientSecret: string;
    /** Root element ID where SDK will be mounted */
    rootId: string;
    /** Environment mode for SDK */
    mode: Mode;
    /** Optional theme customization */
    theme?: Theme;
}

/** Status of payment transaction */
export type Status = "success" | "failure"

export type SubscribeCallback = (callback: (res: Result) => void) => void;

/**
 * Result object returned in callback after transaction
 */
export type Result = {
    /** Status indicating success/failure of transaction */
    status: Status;
    /** Detailed message about transaction result */
    message: string;
}

/**
 * Main SDK class for integrating RootPay payments
 */
export class RootPaySDK {
    /**
     * Creates an instance of RootPaySDK
     * @param config - Configuration options for SDK initialization
     */
    constructor(config: SDKConfig);

    /**
     * Initializes the SDK with provided configuration
     */
    init(): void;

    /**
     * Subscribes to payment status updates
     * @param callback - Function to handle payment result
     */
    subscribe: SubscribeCallback;
}
