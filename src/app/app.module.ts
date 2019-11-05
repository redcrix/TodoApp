import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    FormsModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
