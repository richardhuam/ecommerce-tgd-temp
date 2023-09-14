import * as fs from 'fs';
import { join } from 'path';

export function writeErrorLogToFile(errorLog: string) {
	const logsFolderPath = join(__dirname, '..', '..', '..', '..', 'logs');
	const errorLogFilePath = join(logsFolderPath, 'error.log');
	const encoding: fs.WriteFileOptions = 'utf-8';

	if (!fs.existsSync(logsFolderPath)) {
		fs.mkdirSync(logsFolderPath);
	}

	if (!fs.existsSync(errorLogFilePath)) {
		fs.writeFileSync(errorLogFilePath, '', encoding);
	}

	return fs.appendFile(errorLogFilePath, errorLog, encoding, (error) => {
		if (error) throw error;
	});
}
