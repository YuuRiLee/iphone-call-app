import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { UserDetailPage } from '../../pages/user-detail/user-detail';
import { BookmarkAddPage } from '../bookmarkAdd/bookmarkAdd';
@Component({
	selector: 'page-bookmark',
	templateUrl: 'bookmark.html'
})
export class BookmarkPage {
	user: any;
	userData: any[] = [];
	bookmarkUserData: any[] = [];
	showDelete: boolean = false;
	constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events) {
		// this.user = navParams.get('user');


		this.eventsListener();
	}


	eventsListener() {
		this.events.subscribe('bookmark:add', () => {
			this.getBookmarkUserData();
		})
	}

	ngOnInit() {
		this.getBookmarkUserData();
	}



	getBookmarkUserData() {
		this.userData = JSON.parse(localStorage.getItem('content'));
		this.user = this.navParams.get('user');
		this.bookmarkUserData = [];

		// this.userData.forEach(function(v,i){
		// 	console.log(v.bookMarkCheck);
		// 	if
		// });
		for (let i = 0; i < this.userData.length; i++) {
			if (this.userData[i].bookMarkCheck === true) {
				this.bookmarkUserData.push(this.userData[i]);
			}
		}
	}


	userDetail(user: object) {
		this.navCtrl.push(UserDetailPage, { user: user });
	}

	editBookmark() {
		this.showDelete = true;

	}
	doneEdit() {
		//location.reload();
		this.showDelete = false;
	}
	bookmarkDel(data: any) {
		for (let i = 0; i < this.userData.length; i++) {
			if (data.id === this.userData[i].id) {
				console.log('same');
				this.userData[i].bookMarkCheck = false;
				this.bookmarkUserData.forEach((v, i, a) => {
					if (v.id === data.id) {
						a.splice(i, 1);
					}
				})
			}
		}
		console.log(this.userData);
		localStorage.setItem('content', JSON.stringify(this.userData));
		// location.reload();
	}

	addBookmark(){
		this.navCtrl.push(BookmarkAddPage, { user: this.user });
	}
}
