export class Logger {
    constructor(mode) {
        Object.defineProperty(this, "mode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "YELLOW", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '\x1b[33m%s\x1b[0m'
        });
        Object.defineProperty(this, "RED", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '\x1b[31m%s\x1b[0m'
        });
        this.mode = mode;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logWithoutChecks(...args) {
        console.log(this.YELLOW, args.join(' '));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info(...args) {
        if (this.mode !== 'dev')
            return;
        console.log(this.YELLOW, args.join(' '));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(...args) {
        if (this.mode !== 'dev')
            return;
        console.log(this.RED, args.join(' '));
    }
    // Static error thrower
    static throwError(message) {
        const error = new Error(message);
        error.name = "Rootpay SDK Error";
        throw error;
    }
}
