const bcrypt = require("bcrypt");


const createHash = async (password) => {
  return await bcrypt.hash(password, 10);
}
const compareHash = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
}
module.exports = {
  createHash, compareHash
}