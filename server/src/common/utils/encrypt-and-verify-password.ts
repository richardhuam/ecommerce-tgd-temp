import * as bcrypt from 'bcryptjs';

const saltOrRounds = 10;

const encryptPwd = async (plainTextPassword: string): Promise<string> => {
	const hashedPassword = await bcrypt.hash(plainTextPassword, saltOrRounds);
	return hashedPassword;
};

const verifyPwd = async (plainTextPassword: string, hashedPassword: string): Promise<boolean> => {
	const isCorrect = await bcrypt.compare(plainTextPassword, hashedPassword);
	return isCorrect;
};

export { encryptPwd, verifyPwd };
