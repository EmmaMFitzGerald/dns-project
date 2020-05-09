/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from "node-fetch";

// eslint-disable-next-line consistent-return
export default async function postToCliServer(
    url: any,
    data: any
): Promise<any> {
    const config = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    return fetch(url, config).then(
        (response: any): Promise<any> => {
            return response.json();
        }
    );
}
