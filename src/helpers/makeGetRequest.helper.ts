import fetch from "node-fetch";

export default async function makeGetRequest(url: string): Promise<Request> {
    return fetch(url).then(
        (response: any): Promise<any> => {
            return response.json();
        }
    );
}
