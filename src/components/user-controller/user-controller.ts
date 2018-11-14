import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ServiceProvider } from '../../providers/http-service/http-service';

@Component({
    selector: 'user-controller',
	templateUrl: 'user-controller.html'
})
export class userControllerComponent {
	_user : any; //[userGet] = "user" 히면 자식 컴포넌트에 있는 userGet 함수가 호출됨
	@Input () set phoneCheck (v:any){
		if(v){
			this._user=v;
		}
		console.log('실행 : ',this._user);
	}

	constructor(
		private plt: Platform,
		private serviceProvider: ServiceProvider
	){

	}
	call(){
		if(this._user.phone){
			console.log('전화 연결');
			this.serviceProvider.call(this._user.phone);
		}
	}
	//@Output() callEvent = new EventEmitter();
}