import fetch from "node-fetch";

// eslint-disable-next-line consistent-return
export default async function makeRequest(
    url: string,
    data: object
): Promise<Request> {
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
