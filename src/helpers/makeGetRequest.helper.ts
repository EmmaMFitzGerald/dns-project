import fetch from "node-fetch";

export default async function makeGetRequest(url: string): Promise<any> {
    return fetch(url).then(
        (response: any): Promise<any> => {
            return response.json();
        }
    );
}
