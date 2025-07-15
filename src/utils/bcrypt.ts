import * as bcrypt from 'bcrypt';

export function hashPassword(rawPassword:string) {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, SALT)
}

export async function comparePassword(rawPassword:string, hash:string) {
  return await bcrypt.compare(rawPassword, hash);
}