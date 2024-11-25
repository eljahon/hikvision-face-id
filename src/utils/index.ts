import * as bcrypt from 'bcrypt';

export const hashGenerator = async (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const hashCompare = async (password: string, hash: string) => {
  return await bcrypt.compareSync(password, hash);
};