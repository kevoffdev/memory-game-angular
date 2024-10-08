import { Injectable } from '@angular/core';

export interface IQuote {
	id: number;
	character: string;
	quote: string;
}

@Injectable({
	providedIn: 'root'
})
export class GetQuoteService {
	// currentQuote: Quote = this.getQuote();
	// private getQuote(): Quote {
	// 	// const card = this.deckService.getDeck();
	// 	console.log(this.deckService.prepareDeck());
	// 	// return { id: card.id, character: card.name, quote: card.description };
	// 	return { id: 1, character: 'fer', quote: 'hola' };
	// }
	// currentQuote: Quote = {
	// 	id: 1,
	// 	character: '',
	// 	quote: ''
	// };
	// getQuote() {
	// 	return this.currentQuote;
	// }
	// getRandomQuote(cards: ICard[]) {
	// 	// console.log(cards);
	// 	const index = Math.floor(Math.random() * cards.length);
	// 	const card = cards[index];
	// 	return (this.currentQuote = { id: card.id, character: card.name, quote: card.description });
	// }
}
