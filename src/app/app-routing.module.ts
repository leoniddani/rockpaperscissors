import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: "main" , component: MainComponent
  },
  {
    path:"playWithComputer" ,component: GameComponent , data:{ player: "Computer" }
  },
  {
    path:"playWithFriend", component: GameComponent , data : { player: "Player2" }
  },
  {
    path:"**", redirectTo:"main"
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
