const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TABLE_NAME;

exports.handler = async () => {
  try {
    const item = await docClient.scan({
      TableName: tableName
    }).promise();
    return item.Items;
  } catch (err) { 
    return { error: err };
  }
};