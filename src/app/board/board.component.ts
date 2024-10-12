import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { MessageComponent } from "../message/message.component";
import { ICard } from "../models/card.model";
import { QuoteComponent } from "../quote/quote.component";
import { DeckService } from "../services/deck.service";
import { GameService } from "../services/game.service";
import { TimerComponent } from "../timer/timer.component";

@Component({
	selector: "app-board",
	standalone: true,
	imports: [QuoteComponent, TimerComponent, MessageComponent],
	templateUrl: "./board.component.html",
	styleUrl: "./board.component.scss",
})
export class BoardComponent implements OnInit, OnDestroy {
	private suscribeTimer = new Subscription();
	private suscriptions = new Subscription();

	isTimerFinished = false;
	isWin = false;

	constructor(
		public deckService: DeckService,
		public gameService: GameService
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

	reloadBoard() {
		this.isTimerFinished = false;
		this.isWin = false;
		this.gameService.reloadGame();
	}
}
