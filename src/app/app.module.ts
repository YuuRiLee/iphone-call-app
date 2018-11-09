import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UserDetailPage } from "../pages/user-detail/user-detail";
import { UserCreatePage } from "../pages/user-create/user-create";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';

import { HttpModule } from '@angular/http';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { HttpClientModule } from '@angular/common/http';
import { BookmarkPage } from '../pages/bookmark/bookmark';
import { RecentCurrencyPage } from '../pages/recent-currency/recent-currency';
import { VoicemailPage } from '../pages/voicemail/voicemail';
import { BookmarkAddPage } from '../pages/bookmarkAdd/bookmarkAdd';

@NgModule({
	declarations: [
		MyApp,
		AboutPage,
		ContactPage,
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
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		AboutPage,
		ContactPage,
		HomePage,
		TabsPage,
		UserDetailPage,
		UserCreatePage,
		BookmarkPage,
		RecentCurrencyPage,
		VoicemailPage,
		BookmarkAddPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		HttpServiceProvider,
		Camera
	]
})
export class AppModule { }
