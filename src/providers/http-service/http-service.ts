import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from '@angular/core/src/render3/util';

import { map } from 'rxjs/operators';


/**
 * 1. storage 에 데이터가 있는지 확인
 * 2. 없다면, http get을 하여 데이터를 가져온다.
 * 3. 가져온 데이터를 stroage 에 저장한다.
 * 
 * 2. 있다면, STORAGE 데이터를 활용한다.
 * 
 * 
 */


@Injectable()
export class HttpServiceProvider {

	userData: string;
	constructor(public http: HttpClient) {
		console.log('Hello HttpServiceProvider Provider');
	}

	getUserData() {
		this.http.get('https://jsonplaceholder.typicode.com/users')
			.subscribe((data: Array<any>) => {

				console.log('Data retrived from http get', JSON.stringify(data));

				//let nameExtracted = data.map(v => v.name);

				localStorage.setItem('content', JSON.stringify(data));
			});
	}

}




// Storage.set('contacts', value);


// value = JSON.stringify([
// 	{},
// 	{},
// 	{},
// 	{},
// 	{},
// 	{},
// 	{},
// 	{},
// 	{},
// 	{},
// 	{},
// 	{},

// ])



// Storage.get('contacts', value => {
// 	value = JSON.parse(value);

// 	value.name;
// 	value.phone


// })



// value[5].name = 'abc';


// Storage.set('contacts', JSON.stringify(value));