import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { BookmarkPage } from '../bookmark/bookmark';
import { RecentCurrencyPage } from '../recent-currency/recent-currency';
import { VoicemailPage } from '../voicemail/voicemail';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = BookmarkPage;
  tab2Root = RecentCurrencyPage;
  tab3Root = HomePage;
  tab4Root = AboutPage;
  tab5Root = VoicemailPage;

  constructor() {

  }
}
