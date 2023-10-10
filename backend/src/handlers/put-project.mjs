import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient, PutCommand} from "@aws-sdk/lib-dynamodb";
import {randomUUID} from "crypto";
import Ajv from "ajv";

const ENDPOINT_OVERRIDE = process.env.ENDPOINT_OVERRIDE;
let ddbClient = undefined;

if (ENDPOINT_OVERRIDE) {
    ddbClient = new DynamoDBClient({endpoint: ENDPOINT_OVERRIDE});
} else {
    ddbClient = new DynamoDBClient({});
    console.warn("No value for ENDPOINT_OVERRIDE provided for DynamoDB, using default");
}


const ajv = new Ajv();
const schema = {
    type: "object", properties: {
        name: {type: "string"}, owner: {type: "string"}, description: {type: "string"}
    },
    required: ["name", "owner"],
    additionalProperties: false,
}
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const tableName = process.env.PROJECT_TABLE;

export const putProjectHandler = async (event) => {
    if (event.httpMethod !== "POST") {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    console.info("received:", event);

    const body = JSON.parse(event.body);


    const valid = ajv.validate(schema, body);
    if (!valid) {
        console.log(ajv.errors);
        return {
            statusCode: 400, headers: {
                "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Origin": "*", //DO NOT USE THIS VALUE IN PRODUCTION - https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            }, body: JSON.stringify({
                message: "Bad request"
            }),
        };
    }

    const {name, owner, description} = body;

    const projectId = randomUUID();
    const params = {
        TableName: tableName, Item: {
            projectId,
            name,
            owner,
            description,
            createdDate: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
        },
    };

    try {
        const data = await ddbDocClient.send(new PutCommand(params));
        console.log("Success - item added or updated", data);
    } catch (err) {
        console.error("Error adding or updating item:", err.message);
        console.error("Error code:", err.code);
        console.error("Error name:", err.name);
        console.error("Error stack:", err.stack);

        throw err;
    }

    const response = {
        statusCode: 200, headers: {
            "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Allow-Origin": "*", //DO NOT USE THIS VALUE IN PRODUCTION - https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        }, body: JSON.stringify(body),
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
