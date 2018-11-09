import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { UserDetailPage } from '../../pages/user-detail/user-detail';
@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html'
})
export class BookmarkPage {
  user: any;
  userData: any[]=[];
  bookmarkUserData: any[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.user = navParams.get('user');
  }
  ngOnInit() {
	this.userData = JSON.parse(localStorage.getItem('content'));
	this.user = this.navParams.get('user');

	// this.userData.forEach(function(v,i){
	// 	console.log(v.bookMarkCheck);
	// 	if
	// });
	for(let i=0;i<this.userData.length;i++){
		if(this.userData[i].bookMarkCheck===true){
			this.bookmarkUserData.push(this.userData[i]);
		}
	}
  }


  userDetail(user: object) {
	this.navCtrl.push(UserDetailPage, { user: user });
}
}
