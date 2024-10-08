import { Component, OnInit } from '@angular/core';
import { DeckService } from '../services/deck.service';
import { ICard } from '../models/card.model';
import { QuoteComponent } from '../quote/quote.component';
import { GameService } from '../services/game.service';
import { GetQuoteService } from '../services/get-quote.service';

@Component({
	selector: 'app-board',
	standalone: true,
	imports: [QuoteComponent],
	templateUrl: './board.component.html',
	styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
	constructor(
		public deckService: DeckService,
		public gameService: GameService,
		public getQuote: GetQuoteService
	) {}

	ngOnInit(): void {
		this.deckService.prepareDeck();
	}

	cardAction(card: ICard) {
		if (card.isFleep) return;
		this.gameService.cardAction(card);

		// if (!this.firstClick) {
		// 	this.firstClick = card.name;
		// } else {
		// 	this.secondClick = card.name;
		// 	this.checkClicks();
		// }
	}

	checkClicks() {
		// if (this.firstClick === this.secondClick) {
		// 	console.log('iguales');
		// }
		// this.cleanClicks();
	}

	cleanClicks() {
		// this.firstClick = '';
		// this.secondClick = '';
	}
}
