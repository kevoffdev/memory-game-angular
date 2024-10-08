import { Injectable } from '@angular/core';
import { ICard } from '../models/card.model';

@Injectable({
	providedIn: 'root'
})
export class CardService {
	flipCard(card: ICard) {
		card.isFleep = !card.isFleep;
	}

	setPaired(card: ICard) {
		card.isPaired = true;
	}
}
