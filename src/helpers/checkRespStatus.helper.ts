import fetch from "node-fetch";

// eslint-disable-next-line consistent-return
export default async function checkRespStatus(url: string): Promise<Request> {
    return fetch(url).then(
        (response: any): Promise<any> => {
            return response.status;
        }
    );
}
