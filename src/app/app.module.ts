import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent }   from './components/app.component';
import { HomeComponent } from './components/home.component';
import { LoginComponent }   from './components/login.component';

const appRoutes: Routes =[
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent}
];

@NgModule({
    imports:      [ BrowserModule, RouterModule.forRoot(appRoutes), FontAwesomeModule, FormsModule,
        ReactiveFormsModule],
    declarations: [ AppComponent, HomeComponent, LoginComponent ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
