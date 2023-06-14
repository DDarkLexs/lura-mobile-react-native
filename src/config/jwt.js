import jwt from 'jsonwebtoken';
const secretKey = 'your-secret-key';

export const generateAccessToken = (user) => {
  // console.log(user)
  return jwt.sign(user, secretKey, {expiresIn: '10s'});
}

export const verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
