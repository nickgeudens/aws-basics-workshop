const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  try {
    const { id, vote } = event;
    await docClient.update({
      TableName : tableName, 
      Key: {"id": id},
      UpdateExpression: "set vote=:v",
      ExpressionAttributeValues:{ ":v": vote }
    }).promise();
    return { body: 'successfully updated item ' + id + ' to ' + vote};
  } catch (err) {
    return { error: err };
  }
};