import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeckService } from '../services/deck.service';
import { ICard } from '../models/card.model';
import { QuoteComponent } from '../quote/quote.component';
import { GameService } from '../services/game.service';
import { GetQuoteService } from '../services/get-quote.service';
import { TimerComponent } from '../timer/timer.component';
import { Subscription } from 'rxjs';
import { MessageComponent } from '../message/message.component';

@Component({
	selector: 'app-board',
	standalone: true,
	imports: [QuoteComponent, TimerComponent, MessageComponent],
	templateUrl: './board.component.html',
	styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit, OnDestroy {
	private suscribeTimer = new Subscription();
	private suscriptions = new Subscription();

	isTimerFinished = false;
	isWin = false;

	constructor(
		public deckService: DeckService,
		public gameService: GameService,
		public getQuote: GetQuoteService
	) {}

	ngOnInit(): void {
		this.initializeGame();
		this.suscribeTimer.add(
			this.gameService.timerFinished$.subscribe(() => {
				this.isTimerFinished = true;
			})
		);
		this.suscriptions.add(
			this.gameService.isWon$.subscribe((isWon) => {
				this.isWin = isWon;
			})
		);
	}

	ngOnDestroy() {
		if (this.suscribeTimer) {
			this.suscribeTimer.unsubscribe();
		}
		this.suscriptions.unsubscribe();
	}

	cardAction(card: ICard) {
		if (card.isFleep) return;
		this.gameService.cardAction(card);
	}

	initializeGame() {
		this.deckService.prepareDeck();
	}
}
