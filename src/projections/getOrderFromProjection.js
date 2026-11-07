function getOrderFromProjection(orderId) {
  return dynamoDb.get(orderId) || null;
}

module.exports = { getOrderFromProjection };
