import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController, ModalController, Item, Events } from 'ionic-angular';
import { stringify } from '@angular/core/src/render3/util';
import { UserCreatePage } from '../../pages/user-create/user-create';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';

import { Storage } from '@ionic/storage';


@Injectable()
export class ServiceProvider {

	userData: any = [];
	callList: any = [];


	private user$ = new BehaviorSubject<any>([]);
	userCast = this.user$.asObservable();


	private callLis$ = new BehaviorSubject<any>(this.callList);
	callListCast = this.callLis$.asObservable();


	constructor(
		public http: HttpClient,
		public modalCtrl: ModalController,
		private localStorage: Storage
	) {
		// super();
		console.log('Hello HttpServiceProvider Provider');
		// this.local = new Storage();
		//this._users = <BehaviorSubject<UserModel[]>>new BehaviorSubject([]);
	}

	dataInit() {
		console.log('음 한 번만');
		this.localStorage.get('callList').then((val) => {
			this.callList = val ? JSON.parse(val) : []
			this.callLis$.next(this.callList);
		});
		this.localStorage.get('content').then((val) => {
			this.userData = val ? JSON.parse(val) : [];
			if (this.userData.length === 0) {
				this.getUserDataFromApi();
			} else {
				this.user$.next(this.userData);
			}
		});
	}


	getUserDataFromApi() {
		this.http.get('https://jsonplaceholder.typicode.com/users')
			.subscribe((data: Array<any>) => {
				this.userData = data;
				this.localStorage.set('content', JSON.stringify(data));
				this.user$.next(this.userData);
			});
	}



	getUserData() {
		//this.userData.next(data);
		//return this._users.asObservable();
		this.userData = JSON.parse(localStorage.getItem('content'));
		this.userData.sort(function (a, b) {
			var textA = a.name.toUpperCase();
			var textB = b.name.toUpperCase();
			return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		})

		// this.user.next(this.userData);



		/**
		 *   this.serviceProvider.cast.sub
		 */

		return this.userData;
	}
	// setUserData(data: object) {
	// 	(localStorage.setItem('content', JSON.stringify(data)));
	// }

	userCreate(data: object, phone?: String, user?: object): void {
		let addModal;
		if (phone) {
			console.log('전화번호만 있는 경우');
			addModal = this.modalCtrl.create(UserCreatePage, { phone: phone });
		}
		else if (user) {
			console.log('nono');
		}
		else { //data만 있는 경우
			console.log('data만 있는 경우');
			addModal = this.modalCtrl.create(UserCreatePage);
		}


		addModal.onDidDismiss(item => {
			if (item) {
				if (item.name == '' && item.familyname == '') {
					item.name = '이름 없음';
				}

				console.log('---checkoint1-----');
				console.log(this.userData);


				this.userData.push(
					{
						id: Date.now() + Math.random(),
						name: item.familyname + item.name,
						email: item.email,
						address: {
							street: item.street,
							suite: item.suite,
							city: item.city,
							zipcode: item.zipcode
						},
						phone: item.phone,
						website: item.website,
						company: {
							company: item.company
						}

					}
				);
				console.log('check>>>', this.userData);
				this.userData.sort(function (a, b) {
					var textA = a.name.toUpperCase();
					var textB = b.name.toUpperCase();
					return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				})
		
				//this.setUserData(this.userData);
				this.user$.next(this.userData);

			}
		})
		addModal.present();
	}

}


