import bcrypt from 'bcryptjs';

const passwords = ['123456789', 'admin123', 'password321'];

passwords.forEach(async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(pass, salt);
  console.log(pass, '=>', hash);
});
