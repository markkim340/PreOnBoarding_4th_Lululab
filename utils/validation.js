const { BaseError } = require('../middlewares/appError');

const validationName = (name) => {
  const nameRegExp = new RegExp(/^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/);
  if (!nameRegExp.test(name)) {
    throw new BaseError('이름 형식이 맞지 않습니다.', 400);
  }
};

const validationPhone = (phoneNumber) => {
  const phoneRegExp = new RegExp(/01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/);
  if (!phoneRegExp.test(phoneNumber)) {
    throw new BaseError('휴대폰번호 형식이 맞지 않습니다.', 400);
  }
};

module.exports = { validationName, validationPhone };
