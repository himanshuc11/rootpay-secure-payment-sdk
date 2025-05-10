import type { Mode } from "../../types/rootpay-secure-payment-sdk";

export class Logger {
    private mode: Mode;
    private readonly YELLOW = '\x1b[33m%s\x1b[0m';
    private readonly RED = '\x1b[31m%s\x1b[0m';

    constructor(mode: Mode) {
        this.mode = mode;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public logWithoutChecks(...args: any[]): void {
        console.log(this.YELLOW, args.join(' '));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public info(...args: any[]): void {
        if (this.mode !== 'dev') return;
        console.log(this.YELLOW, args.join(' '));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public error(...args: any[]): void {
        if (this.mode !== 'dev') return;
        console.log(this.RED, args.join(' '));
    }

    // Static error thrower
    public static throwError(message: string): never {
        const error = new Error(message);
        error.name = "Rootpay SDK Error";
        throw error;
    }
}
