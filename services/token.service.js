const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY || "goitnode2020";

const createToken = async (id) => {
  const token = await jwt.sign(id, JWT_KEY, {
    expiresIn: 2 * 24 * 60 * 60, //2days
  });
  return `Bearer ${token}`;
};

const verifyToken = async (token) => {
  const paresdToken = token.replace("Bearer ", "");
  return await jwt.verify(paresdToken, JWT_KEY);
};

module.exports = {
  createToken,
  verifyToken,
};
