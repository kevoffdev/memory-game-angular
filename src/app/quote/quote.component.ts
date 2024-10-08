import { Component } from '@angular/core';
import { Quote } from '../services/get-quote.service';

@Component({
	selector: 'app-quote',
	standalone: true,
	imports: [],
	templateUrl: './quote.component.html',
	styleUrl: './quote.component.scss'
})
export class QuoteComponent {
	// quote: Quote = {
	// 	id: 1,
	// 	quote: '',
	// 	character: ''
	// };
	quote: Quote | null = null;
}
