import { Component, OnInit } from "@angular/core";
import { GameService } from "../services/game.service";
import { Subscription } from "rxjs";

@Component({
	selector: "app-timer",
	standalone: true,
	imports: [],
	templateUrl: "./timer.component.html",
	styleUrl: "./timer.component.scss",
})
export class TimerComponent implements OnInit {
	private suscriptions = new Subscription();
	private suscriptionTimer = new Subscription();

	isWin = false;
	timer!: number;
	intervalId!: ReturnType<typeof setInterval>;

	constructor(private gameService: GameService) {}

	ngOnInit() {
		this.suscriptionTimer.add(
			this.gameService.timerSource.subscribe({
				next: (time) => {
					this.timer = time;
					this.startTimer();
				},
			})
		);

		this.suscriptions.add(
			this.gameService.isWon$.subscribe((isWon) => {
				if (isWon) {
					this.isWin = isWon;
					this.stopTimer();
					this.gameService.notifyTimerFinished();
				}
			})
		);
	}

	startTimer() {
		this.intervalId = setInterval(() => {
			this.timer--;
			if (this.timer === 0) {
				this.stopTimer();
				this.gameService.notifyTimerFinished();
			}
		}, 1000);
	}
	stopTimer() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
	}
}
