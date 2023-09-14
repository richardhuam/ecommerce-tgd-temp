import * as fs from 'fs';
import { join } from 'path';

export function getLogStream() {
	const logsFolderPath = join(__dirname, '..', '..', '..', '..', 'logs');
	const apiLogFilePath = join(logsFolderPath, 'api.log');
	const encoding: fs.WriteFileOptions = 'utf-8';

	if (!fs.existsSync(logsFolderPath)) {
		fs.mkdirSync(logsFolderPath);
	}

	if (!fs.existsSync(apiLogFilePath)) {
		fs.writeFileSync(apiLogFilePath, '', encoding);
	}

	return fs.createWriteStream(apiLogFilePath, {
		flags: 'a',
	});
}
