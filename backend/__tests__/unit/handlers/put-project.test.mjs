// Import putItemHandler function from put-item.mjs
import { putProjectHandler } from "../../../src/handlers/put-project.mjs";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
describe("Test putProjectHandler", function () {
  const ddbMock = mockClient(DynamoDBDocumentClient);

  beforeEach(() => {
    ddbMock.reset();
  });

  // This test invokes putProjectHandler() and compare the result
  it("should add id to the table", async () => {
    const returnedItem = {
      name: "Global name",
      description: "test test",
      owner: " test test",
    };

    // Return the specified value whenever the spied put function is called
    ddbMock.on(PutCommand).resolves({
      returnedItem,
    });

    const event = {
      httpMethod: "POST",
      body: '{ "name": "Global name", "description": "test test", "owner": " test test"}',
    };

    // Invoke putItemHandler()
    const result = await putProjectHandler(event);

    const expectedResult = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(returnedItem),
    };

    // Compare the result with the expected result
    expect(result).toEqual(expectedResult);
  });
});
