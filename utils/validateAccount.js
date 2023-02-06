const jwt = require('jsonwebtoken');

const validator = (token1, token2) => {
    try {
        const verified = jwt.verify(token1, token2);
        return verified
    } catch (err) {
        return false
    }
}

module.exports = validator;