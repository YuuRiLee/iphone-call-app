import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UserDetailPage } from "../pages/user-detail/user-detail";
import { UserCreatePage } from "../pages/user-create/user-create";

import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

import { HttpModule } from '@angular/http';
import { ServiceProvider } from '../providers/http-service/http-service';
import { HttpClientModule } from '@angular/common/http';
import { BookmarkPage } from '../pages/bookmark/bookmark';
import { RecentCurrencyPage } from '../pages/recent-currency/recent-currency';
import { VoicemailPage } from '../pages/voicemail/voicemail';
import { BookmarkAddPage } from '../pages/bookmarkAdd/bookmarkAdd';
import {ComponentsModule } from '../components/components.module'

@NgModule({
	declarations: [
		MyApp,
		AboutPage,
		HomePage,
		TabsPage,
		UserDetailPage,
		UserCreatePage,
		BookmarkPage,
		RecentCurrencyPage,
		VoicemailPage,
		BookmarkAddPage
		
		
	],
	imports: [
		BrowserModule,
		HttpModule,
		HttpClientModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot(),
		ComponentsModule
		
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		AboutPage,
		HomePage,
		TabsPage,
		UserDetailPage,
		UserCreatePage,
		BookmarkPage,
		RecentCurrencyPage,
		VoicemailPage,
		BookmarkAddPage,
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		ServiceProvider,
		Camera
	]
})
export class AppModule { }
