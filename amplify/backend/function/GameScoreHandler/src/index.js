/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import AWS from 'aws-sdk';
var dynamodb = new AWS.DynamoDB({apiVersion: '2019-11-21'});

exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event, null, '  '));
    const tableName = "GameScores";    
    dynamodb.putItem({
        "TableName": tableName,
        "Item" : {
            "teamName": "randomTeamName",
            "gameScore": "123"
        }
    }, function(err, data) {
        if (err) {
            console.log('Error putting item into dynamodb failed: '+err);
            context.done('error');
        }
        else {
            console.log('great success: '+JSON.stringify(data, null, '  '));
            context.done('Done');
        }
    });
};