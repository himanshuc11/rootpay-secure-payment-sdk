declare module 'rootpay-secure-payment-sdk' {
    type Mode = "dev" | "production"

    type Theme = {
        primaryColor: string;
        secondaryColor: string;
    }

    type SDKConfig = {
        key: string;
        rootId: string;
        mode: Mode;
        theme?: Theme;
    }

    type Status = "success" | "failure"

    type Result = {
        status: Status;
        message: string;
    }

    export class RootPaySDK {
        constructor(config: SDKConfig);
        init(): void;
        subscribe(callback: (res: Result) => void): void;
    }
}
