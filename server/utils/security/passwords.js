import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
