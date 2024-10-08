import { Component, OnDestroy, OnInit } from '@angular/core';
import { IQuote } from '../services/get-quote.service';
import { GameService } from '../services/game.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-quote',
	standalone: true,
	imports: [],
	templateUrl: './quote.component.html',
	styleUrl: './quote.component.scss'
})
export class QuoteComponent implements OnInit, OnDestroy {
	constructor(private gameService: GameService) {}

	private suscriptions = new Subscription();

	quote: IQuote | false = false;

	ngOnInit(): void {
		this.suscriptions.add(
			this.gameService.card$.subscribe((card) => {
				if (!card) {
					this.quote = false;
					return;
				}
				this.quote = {
					id: card.id,
					character: card.name,
					quote: card.description
				};
			})
		);
	}

	ngOnDestroy(): void {
		this.suscriptions.unsubscribe();
	}
}
