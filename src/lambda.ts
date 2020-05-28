/* eslint-disable import/prefer-default-export */
export const helloWorld = async (event: any = {}): Promise<any> => {
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        },
        body: "hello world",
    };

    console.log(response.body);
    return response;
};
