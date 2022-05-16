import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDishComponent } from './components/add-dish/add-dish.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
import { CartComponent } from './components/cart/cart.component';
import { FeedbackAnalysisComponent } from './components/feedback-analysis/feedback-analysis.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { MainComponent } from './components/main/main.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { OrderComponent } from './components/order/order.component';
import { RecipeCheckerComponent } from './components/recipe-checker/recipe-checker.component';
import { RecipeUploaderComponent } from './components/recipe-uploader/recipe-uploader.component';
import { RegisterComponent } from './components/register/register.component';
import { ReportComponent } from './components/report/report.component';
import { RestrauntComponent } from './components/restraunt/restraunt.component';
import { SigninComponent } from './components/signin/signin.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'report', component: ReportComponent },
  { path: 'main', component: MainComponent, children:[
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'restraunt', component: RestrauntComponent },
    { path: 'orders', component: OrderComponent },
    { path: 'cart', component: CartComponent },
    { path: 'add-dish', component: AddDishComponent },
    { path: 'add-rest', component: AddRestaurantComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: 'feedback-analysis', component: FeedbackAnalysisComponent },
    { path: 'report', component: ReportComponent },
    { path: 'recipe-uploader', component: RecipeUploaderComponent },
    { path: 'recipe-checker', component: RecipeCheckerComponent },
    { path: 'connect/:id', component: MessengerComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
