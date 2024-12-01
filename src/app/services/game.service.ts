import { Injectable } from "@angular/core";
import { ICard } from "../models/card.model";
import { CardService } from "./card.service";
import { BehaviorSubject, Subject } from "rxjs";
import { DeckService } from "./deck.service";
import { ConfettiService } from "./conffeti.service";

@Injectable({
	providedIn: "root",
})
export class GameService {
	timerDefault = 60;

	private cardSource = new BehaviorSubject<ICard | false>(false);
	private isWonSource = new BehaviorSubject<boolean>(false);
	private timerFinishedSource = new Subject<void>();
	timerSource = new BehaviorSubject(this.timerDefault);

	isWon$ = this.isWonSource.asObservable();
	card$ = this.cardSource.asObservable();
	timerFinished$ = this.timerFinishedSource.asObservable();

	private firstCard: ICard | null = null;
	private secondCard: ICard | null = null;
	private blockSelection = false;

	constructor(
		private cardService: CardService,
		private deckService: DeckService,
		private conffetiService: ConfettiService
	) {}

	cardAction(card: ICard) {
		if (this.blockSelection) return;

		this.cardService.flipCard(card);

		if (!this.firstCard) {
			this.firstCard = card;
			this.cardSource.next(this.firstCard);
		} else {
			this.secondCard = card;
			this.blockSelection = true;
			this.cardSource.next(this.secondCard);
			this.validateCards(this.firstCard, this.secondCard);
			this.cleanCards();
		}
	}

	validateCards(card1: ICard, card2: ICard) {
		if (card1.image === card2.image) {
			this.blockSelection = false;
			this.cardService.setPaired(card1);
			this.cardService.setPaired(card2);
			this.cardSource.next(false);
			if (this.checkGameFinished(this.deckService.getDeck())) {
				this.isWonSource.next(true);
				this.conffetiService.addConfetti();
			}
		} else {
			setTimeout(() => {
				this.cardService.flipCard(card1);
				this.cardService.flipCard(card2);
				this.blockSelection = false;
				this.cardSource.next(false);
			}, 600);
		}
	}

	cleanCards() {
		this.firstCard = null;
		this.secondCard = null;
	}

	checkGameFinished(card: ICard[]) {
		return card.every((card) => card.isPaired);
	}

	notifyTimerFinished() {
		this.timerFinishedSource.next();
	}

	reloadGame() {
		this.deckService.reloadDeck(this.deckService.getDeck());
		this.isWonSource.next(false);
		this.cardSource.next(false);
		this.timerSource.next(this.timerDefault);
		this.firstCard = null;
		this.secondCard = null;
		this.blockSelection = false;
	}
}
