import bcryptjs from 'bcryptjs';

const createHash =  (password) => {

  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt )
};

const isValidPassword = (password, hashedPassword) => {
  return  bcryptjs.compareSync(password, hashedPassword);
}

const createResponse = (req, res, statusCode, data, msg ) => {
  return res.status(statusCode).json({
    data,
    status: statusCode,
    msg: msg? msg : 'success',
    path: req.url,
  });
};

export { createHash, isValidPassword, createResponse };