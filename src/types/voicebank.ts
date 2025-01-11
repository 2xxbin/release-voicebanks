interface IStaff {
	name: string;
	position: string;
	contact: { text: string; link: string };
}

interface IVoicebankDetail {
	name: string;
	illust: string;
	demoYoutubes: string[];
	downloadLink: string;
	explaination: string[];
	staff: IStaff[];
}

export interface IVoicebankData {
	korName: string;
	engName: string;
	hashTag: string[];
	youtubeVideos: string[];
	gender: string;
	age: number;
	height: number;
	weight: number;
	like: string[];
	unLike: string[];
	portrait: string;
	description: string[];
	voiceBanks: { [key: string]: { [key: string]: IVoicebankDetail } };
}
