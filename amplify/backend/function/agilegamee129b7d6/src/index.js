

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(event);
    const teamName = event.pathParameters.teamName;
    const score = {'teamName': teamName, 'score': '100'}
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
     headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "*"
     },
        body: JSON.stringify(score),
    };
    return response;
};
