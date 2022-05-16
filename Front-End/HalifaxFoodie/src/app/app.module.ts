import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { MainComponent } from './components/main/main.component';
import { RestrauntComponent } from './components/restraunt/restraunt.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FeedbackAnalysisComponent } from './components/feedback-analysis/feedback-analysis.component';
import { RecipeUploaderComponent } from './components/recipe-uploader/recipe-uploader.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {MatStepperModule} from '@angular/material/stepper';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { ReportComponent } from './components/report/report.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RecipeCheckerComponent } from './components/recipe-checker/recipe-checker.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    ChatbotComponent,
    MessengerComponent,
    MainComponent,
    RestrauntComponent,
    CartComponent,
    OrderComponent,
    FeedbackComponent,
    FeedbackAnalysisComponent,
    RecipeUploaderComponent,
    AddRestaurantComponent,
    AddDishComponent,
    ReportComponent,
    WelcomeComponent,
    RecipeCheckerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
