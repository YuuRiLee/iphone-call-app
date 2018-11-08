import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { UserCreatePage } from './user-create';

@NgModule({
  declarations: [
    UserCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(UserCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    UserCreatePage
  ]
})
export class UserCreatePageModule { }
