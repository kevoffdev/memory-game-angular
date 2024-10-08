export interface ICard {
	id: number;
	name: string;
	ki: string;
	maxKi: string;
	race: string;
	gender: string;
	description: string;
	image: string;
	affiliation: string;
	deletedAt: null;
	isPaired: boolean;
	isFleep: boolean;
}

export interface ICards {
	items: ICard[];
}
