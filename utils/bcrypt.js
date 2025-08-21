import bcrypt from "bcryptjs";
const hashedPassword = (text) => {
  return bcrypt.hashSync(text, Number(process.env.ROUND_SALT));
};
const compareHashed = (text, hashedText) => {
  return bcrypt.compareSync(text, hashedText);
};
export { hashedPassword, compareHashed };
