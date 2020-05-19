/* eslint-disable import/prefer-default-export */
export const helloWorld = async (event: any = {}): Promise<any> => {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        },
        body: JSON.stringify({
            message: "Hello World",
            input: event,
        }),
    };
};
