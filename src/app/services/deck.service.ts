import { Injectable, inject } from "@angular/core";
import { ICard, ICards } from "../models/card.model";
import { ApiService } from "./api.service";
import { map, Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class DeckService {
	cards: ICard[] = [];
	private readonly apiService = inject(ApiService);

	getDeck() {
		return this.cards;
	}
	prepareDeck() {
		this.generateDeck().subscribe({
			next: (deck) => this.mixDeck(deck.items),
			error: (error) => console.error(error),
		});
	}
	private generateDeck(): Observable<ICards> {
		return this.apiService.getCharacters().pipe(
			map((val: ICards) => {
				return {
					items: val.items.concat(
						val.items.map((item) => {
							return {
								...item,
								id: item.id + 10,
								isFleep: false,
								isPaired: false,
							};
						})
					),
				};
			})
		);
	}

	private mixDeck(deck: ICard[]) {
		this.cards = deck.sort(() => (Math.random() >= 0.5 ? 1 : -1));
	}

	reloadDeck(deck: ICard[]) {
		const newDeck = deck.map((card) => ({ ...card, isFleep: false, isPaired: false }));
		this.mixDeck(newDeck);
	}
}
