import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function load({ params }: any) {
	const { characterName } = params;

	try {
		const filePath = path.resolve('src/routes/[characterName]', `${characterName}.yaml`);
		const fileContents = fs.readFileSync(filePath, 'utf8');
		const data = yaml.load(fileContents);

		return {
			voicebankData: data,
			status: 200,
			error: null
		};
	} catch (err) {
		console.error(err);
		return {
			status: 404,
			error: new Error('Character not found')
		};
	}
}
