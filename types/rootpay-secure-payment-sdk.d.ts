/**
 * Type definitions for RootPay Secure Payment SDK
 * @module rootpay-secure-payment-sdk
 */

/** Current environment in which code is running. 
 * dev mode gives extra debugging logs, make sure to use production mode on production
 */
type Mode = "dev" | "production"

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
type SDKConfig = {
    /** Root Credit key for authentication */
    key: string;
    /** Root element ID where SDK will be mounted */
    rootId: string;
    /** Environment mode for SDK */
    mode: Mode;
    /** Optional theme customization */
    theme?: Theme;
}

/** Status of payment transaction */
type Status = "success" | "failure"

/**
 * Result object returned in callback after transaction
 */
type Result = {
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
    subscribe(callback: (res: Result) => void): void;
}
