import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
        removeUndefinedValues: false
    }
});

const tableName = "GameScores";

export const handler = async event => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };
  const teamName = event.pathParameters;
  const gameScore = event.Item.gameScore;

  try {
    switch (event.routeKey) {
      case `GET /gameScores/${teamName}`:
        body = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              teamName,
            },
          })
        );
        body = body.Item;
        break;
      case "POST /gameScores":
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              teamName,
              gameScore
            }
          })
        );
        body = `Put item with teamName ${teamName} \n and gameScore ${JSON.stringify(gameScore)}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.parse(JSON.stringify(body));
  }

  return {
    statusCode,
    body,
    headers,
  };
};

