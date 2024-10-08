import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-message',
	standalone: true,
	imports: [],
	templateUrl: './message.component.html',
	styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit, OnDestroy {
	private suscriptions = new Subscription();
	isWon = false;
	constructor(public gameService: GameService) {}

	ngOnInit() {
		this.suscriptions.add(
			this.gameService.isWon$.subscribe((isWon) => {
				this.isWon = isWon;
			})
		);
	}
	ngOnDestroy() {
		this.suscriptions.unsubscribe();
	}
}
