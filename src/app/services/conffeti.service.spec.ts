import { TestBed } from '@angular/core/testing';

import { ConffetiService } from './conffeti.service';

describe('ConffetiService', () => {
	let service: ConffetiService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ConffetiService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
