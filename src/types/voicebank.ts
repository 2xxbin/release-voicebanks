interface IStaff {
	name: string;
	position: string;
	contact: { text: string; link: string };
}

interface ISample {
	youtube: string;
	name?: string;
	originalSinger?: string;
	ust?: string;
	explaination?: string[];
}

interface IVoicebankDetail {
	name: string;
	illust: string;
	// demoYoutubes: string[];
	sample: ISample;
	downloadLink: string;
	explaination: string[];
	staff: IStaff[];
}

export interface IVoicebankData {
	korName: string;
	engName: string;
	hashTag: string[];
	youtubeVideos: string[];
	teamForUseLink: string;
	gender: string;
	birthday: string;
	age: number;
	height: number;
	weight: number;
	like: string[];
	unLike: string[];
	portrait: string;
	description: string[];
	staff: IStaff[];
	voiceBanks: { [key: string]: { [key: string]: IVoicebankDetail } };
}

export interface IVoicebankCardData {
	id: string;
	illust: string;
	name: { kor: string; eng: string };
	tag: string[];
}
