import { Injectable } from '@angular/core';
import { ICard } from '../models/card.model';
import { CardService } from './card.service';

@Injectable({
	providedIn: 'root'
})
export class GameService {
	constructor(public cardService: CardService) {}

	private firstCard: ICard | null = null;
	private secondCard: ICard | null = null;
	private blockSelection = false;

	cardAction(card: ICard) {
		if (this.blockSelection) return;

		this.cardService.flipCard(card);

		if (!this.firstCard) {
			this.firstCard = card;
		} else {
			this.secondCard = card;
			this.blockSelection = true;
			this.validateCards(this.firstCard, this.secondCard);
			this.cleanCards();
		}
	}

	validateCards(card1: ICard, card2: ICard) {
		if (card1.image === card2.image) {
			this.blockSelection = false;
		} else {
			setTimeout(() => {
				this.cardService.flipCard(card1);
				this.cardService.flipCard(card2);
				this.blockSelection = false;
			}, 600);
		}
	}

	cleanCards() {
		this.firstCard = null;
		this.secondCard = null;
	}
}
