import bcrypt from "bcryptjs";

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const encrypt = await bcrypt.hash(password, salt);
  return encrypt;
};

export const comparePassword = async (password, encryptPassword) => {
  const passwordMatch = await bcrypt.compare(password, encryptPassword);
  return passwordMatch;
};
