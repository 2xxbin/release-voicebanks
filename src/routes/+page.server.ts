import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';
import type { IVoicebankData } from '../types/voicebank';

export async function load() {
	try {
		const fileBasePath = 'src/routes/[characterName]';
		const voicebanks = fs.readdirSync(fileBasePath).filter((value) => value.endsWith('.yaml'));

		const data = voicebanks.map((voicebankFileName) => {
			const filePath = path.resolve(fileBasePath, voicebankFileName);
			const content = fs.readFileSync(filePath, 'utf-8');
			const contentData: IVoicebankData = yaml.load(content) as IVoicebankData;

			return {
				id: contentData.engName,
				illust: `/images/character/bust/${contentData.engName}.png`,
				name: { kor: contentData.korName, eng: contentData.engName },
				tag: contentData.hashTag
			};
		});

		return { voicebanks: data };
	} catch {
		return {
			status: 404,
			error: new Error('error')
		};
	}
}
