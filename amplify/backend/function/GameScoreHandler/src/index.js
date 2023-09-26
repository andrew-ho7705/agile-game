/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    if (event.httpMethod === "GET") {
        // Handle GET request
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: "GET request processed successfully",
        };
    }

    if (event.httpMethod === "POST") {
        // Handle POST request
        const requestBody = JSON.parse(event.body);
        // Perform any necessary operations with the request data
        // ...
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: requestBody,
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify("Method Not Allowed"),
    };
};
