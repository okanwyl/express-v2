import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

// DynamoDB Endpoint
const ENDPOINT_OVERRIDE = process.env.ENDPOINT_OVERRIDE;
const DEFAULT_PAGE_SIZE = 10;

const ddbClient = ENDPOINT_OVERRIDE
  ? new DynamoDBClient({ endpoint: ENDPOINT_OVERRIDE })
  : new DynamoDBClient({});
if (!ENDPOINT_OVERRIDE) {
  console.warn(
    "No value for ENDPOINT_OVERRIDE provided for DynamoDB, using default"
  );
}

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

// Get the DynamoDB table name from environment variables
const tableName = process.env.PROJECT_TABLE;

export const getAllProjectsHandler = async (event) => {
  if (event.httpMethod !== "GET") {
    throw new Error(
      `getAllProjects only accept GET method, you tried: ${event.httpMethod}`
    );
  }

  console.info("received:", event);

  const queryParams = event.queryStringParameters || {};

  const limit = queryParams.limit
    ? parseInt(queryParams.limit, 10)
    : DEFAULT_PAGE_SIZE;

  const params = {
    TableName: tableName,
    Limit: limit,
  };

  console.log("BIGGGG");
  console.log(queryParams);
  console.log(typeof queryParams.lastEvaluatedKey);

  if (queryParams.lastEvaluatedKey) {
    params.ExclusiveStartKey = { projectId: queryParams.lastEvaluatedKey };
  }

  let items;
  try {
    const data = await ddbDocClient.send(new ScanCommand(params));
    items = data.Items;
  } catch (err) {
    console.error("Error retrieving all items:", err.message);
    console.error("Error code:", err.code);
    console.error("Error name:", err.name);
    console.error("Error stack:", err.stack);

    throw err;
  }

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify(items),
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
