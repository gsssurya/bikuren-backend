const upload = require('../config/multer');

exports.uploadSingle = (fieldName) => upload.single(fieldName);
exports.uploadMultiple = (fieldName, maxCount = 5) =>
upload.array(fieldName, maxCount);
