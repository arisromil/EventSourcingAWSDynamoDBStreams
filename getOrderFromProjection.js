
function getOrderFromProjection(orderId) {
  return dynamoDb.get(orderId) || null;
}
