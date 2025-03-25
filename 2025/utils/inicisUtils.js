const crypto = require('crypto');

// signature 생성 함수
function generateSignature(oid, price, timestamp) {
  const signatureData = `oid=${oid}&price=${price}&timestamp=${timestamp}`;
  return crypto
    .createHash('sha256')
    .update(signatureData)
    .digest('hex');
}

// mKey 생성 함수
function generateMKey() {
  return crypto
    .createHash('sha256')
    .update(process.env.INICIS_SIGN_KEY)
    .digest('hex');
}

module.exports = {
  generateSignature,
  generateMKey
}; 