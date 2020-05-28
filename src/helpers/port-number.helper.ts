import * as portscanner from "portscanner";

export default async function getAvailablePortNumber(): Promise<number> {
    // we need a promise

    return new Promise((resolve: any, reject: any) => {
        portscanner.findAPortNotInUse(
            3000,
            3020,
            "127.0.0.1",
            (error: any, port: any) => {
                if (error) {
                    console.error("Oh well something went wrong");
                    reject(error);
                } else {
                    resolve(port);
                }
            }
        );
    });
}
