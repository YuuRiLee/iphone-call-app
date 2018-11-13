import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController, ModalController, Item, Events } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { stringify } from '@angular/core/src/render3/util';
import { UserCreatePage } from '../../pages/user-create/user-create';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';

import { Storage } from '@ionic/storage';


@Injectable()
export class ServiceProvider {
	@ViewChild('myNav') nav: NavController
	userData: any = [];
	callList: any = [];

	
	public user$ = new BehaviorSubject<any>([]);
	userCast = this.user$.asObservable();


	private callLis$ = new BehaviorSubject<any>(this.callList);
	callListCast = this.callLis$.asObservable();


	constructor(
		public http: HttpClient,
		public modalCtrl: ModalController,
		private localStorage: Storage
	) {
		console.log('Hello HttpServiceProvider Provider');
	}

	dataInit() {

		this.localStorage.get('callList').then((val) => {
			
			this.callList = val ? val : [];
			console.log('chechpoint  callList:', this.callList);
			this.SetCallData(this.callList);
			//this.callLis$.next(this.callList);
		});
		this.localStorage.get('content').then((val) => {
			this.userData = val ? JSON.parse(val) : [];

			if (this.userData.length === 0) {
				this.getUserDataFromApi();
			} else {
				this.userData.sort(function (a, b) {
					var textA = a.name.toUpperCase();
					var textB = b.name.toUpperCase();
					return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
				})
				console.log('chechpoint  userData:', this.userData);
				// this.localStorage.set('content', this.userData);
				// this.user$.next(this.userData);
				this.SetUserData(this.userData);
			}
		});
	}


	getUserDataFromApi() {
		console.log('처음 한 번만');
		this.http.get('https://jsonplaceholder.typicode.com/users')
			.subscribe((data: Array<any>) => {
				this.userData = data;
				this.localStorage.set('content', JSON.stringify(data));
				this.user$.next(this.userData);
			});
	}

	

	SetUserData(userList:any){
		this.localStorage.set('content',JSON.stringify(userList));
		this.user$.next(userList);
	}
	SetCallData(callData: any) {
		this.localStorage.set('callList', callData);
		this.callLis$.next(callData);
	}

	userCreate(data: object, phone?: String): any {
		let addModal;
		let detailData;
		if (phone) {
			console.log('case1');
			addModal = this.modalCtrl.create(UserCreatePage, { phone: phone });
		}
		else { //data만 있는 경우
			console.log('case3');
			addModal = this.modalCtrl.create(UserCreatePage);
		}

		addModal.onDidDismiss(item => {
			if (item) {
				detailData=this.makeData(item);
				this.userData.push(detailData);

				this.sort(this.userData);

				this.SetUserData(this.userData);
			}
		})
		addModal.present();
		
	}

	sort(data){
		data.sort(function (a, b) {
			var textA = a.name.toUpperCase();
			var textB = b.name.toUpperCase();
			return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		})
	}
	makeData(item, userid?:string){
		let id;
		if(userid){
			console.log('편집 데이터 만듬');
			id=userid;
		}
		else{
			console.log('새로운 데이터 만듬');
			id=Date.now() + Math.random()
		}
		if (item.name == '' && item.familyname == '') {
			item.name = '이름 없음';
		}
		const data ={
				id: id,
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

			};

			return data;
	}
	

	groupContacts(contacts) {
		let sorted: any[] = [];
		contacts.forEach((c, ci, ca) => {
			if (sorted.length === 0) {
				sorted.push({
					letter: c.name.charAt(0),
					contacts: [c]
				});
			} else {
				let firstLetter = c.name.charAt(0);
				let found = false;
				sorted.forEach((v, i, a) => {
					if (v.letter === firstLetter) {
						found = true;

						a[i].contacts.push(c);

					}
				});

				if (!found) {
					sorted.push({
						letter: c.name.charAt(0),
						contacts: [c]
					});
				}
			}
		})

		return sorted;
	}

	getItems(ev,groupedContacts) {
		let val = ev.target.value;

		if (val && val.trim() != '') {
			groupedContacts = groupedContacts.filter((item) => {
				for (let i = 0; i < item.contacts.length; i++) {
					console.log(item.contacts[i].name);
					return (item.contacts[i].name.toLowerCase().indexOf(val.toLowerCase()) > -1);
				}
			})
		}//end if
		return groupedContacts;
	}

}


