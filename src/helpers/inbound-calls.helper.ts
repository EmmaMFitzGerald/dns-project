// Inbound calls are from the CLI server to the Import server ////take any req object and client config that has been matched by the url
import fetch from "node-fetch";

export default function marshallCall(
    portNum: number,
    httpMethod: string,
    reqBody: object
): Promise<Request> {
    const config: object = {
        method: httpMethod,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: reqBody,
    };
    return fetch(`localhost:${portNum}`, config).then(
        (response: any): Promise<any> => {
            console.log("response", response);
            return response.json();
        }
    );
}
