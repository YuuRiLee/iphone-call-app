import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'user-name',
	templateUrl: 'user-name.html'
})
export class userNameComponent {
	_user : any; //[userGet] = "user" 히면 자식 컴포넌트에 있는 userGet 함수가 호출됨
	@Input () set userGet (v:any){
		if(v){
			this._user=v;
		}
	}
}