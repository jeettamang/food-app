import jwt from "jsonwebtoken";
const genJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
export { genJWT };
