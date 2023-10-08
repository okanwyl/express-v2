import { putIssueHandler } from "../../../src/handlers/put-issue-handler.mjs"; // Modify the import path as necessary
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";

describe("Test putIssueHandler", function () {
  const ddbMock = mockClient(DynamoDBDocumentClient);

  beforeEach(() => {
    ddbMock.reset();
  });

  it("should add an issue to the table", async () => {
    const returnedItem = {
      projectId: "projectId1",
      issueId: "issueId1",
      title: "Sample Title",
      status: "Open",
    };

    ddbMock.on(PutCommand).resolves({}); // Assume that DynamoDB put command doesn't return the item

    const event = {
      httpMethod: "POST",
      body: JSON.stringify(returnedItem),
    };

    const result = await putIssueHandler(event);

    const expectedResult = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(returnedItem),
    };

    expect(result).toEqual(expectedResult);
  });

});
