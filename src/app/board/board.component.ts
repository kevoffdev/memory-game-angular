import { Component, OnInit, OnDestroy, inject } from "@angular/core";
import { Subscription } from "rxjs";
import { MessageComponent } from "../message/message.component";
import { ICard } from "../models/card.model";
import { DeckService } from "../services/deck.service";
import { GameService } from "../services/game.service";
import { TimerComponent } from "../timer/timer.component";

@Component({
	selector: "app-board",
	standalone: true,
	imports: [TimerComponent, MessageComponent],
	templateUrl: "./board.component.html",
	styleUrl: "./board.component.scss",
})
export class BoardComponent implements OnInit, OnDestroy {
	private suscribeTimer = new Subscription();
	private suscriptions = new Subscription();

	isTimerFinished = false;
	isWin = false;
	public readonly deckService = inject(DeckService);
	private readonly _gameService = inject(GameService);

	ngOnInit(): void {
		this.initializeGame();
		this.suscribeTimer.add(
			this._gameService.timerFinished$.subscribe(() => {
				this.isTimerFinished = true;
			})
		);
		this.suscriptions.add(
			this._gameService.isWon$.subscribe((isWon) => {
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
		this._gameService.cardAction(card);
	}

	initializeGame() {
		this.deckService.prepareDeck();
	}

	reloadBoard() {
		this.isTimerFinished = false;
		this.isWin = false;
		this._gameService.reloadGame();
	}
}
