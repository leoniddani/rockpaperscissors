import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {Wins} from '../models/wins';
import { Player } from '../models/player';

const enum Options {
  Rock= "Rock",
  Paper= "Paper",
  Scissors= "Scissors"
}
const enum Players {
  Computer= "Computer",
  Player= "Player1",
  Player2= "Player2",
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {

  public CheckOptions =  {
  Rock: "Rock",
  Paper: "Paper",
  Scissors: "Scissors"
};

  public winnerMessage:Wins;
  public Player1: any;
  public Player2: any;
  public playerTocheck: boolean;
  public firstSelection: boolean;
  public secondSelection: boolean;
  public stopGame: boolean;
  public computerNumber: number;
  public rounds: number;
  public firstSelected : Player;
  public secondSelected : Player;
  public firstSelectionArray = [];
  public secondSelectionArray = [];

  constructor(
    private route : ActivatedRoute,
    private router : Router
  ) {

  }

  ngOnInit() {
    this.Player1 = Players.Player;
    this.route.data.subscribe( (data) => {
      this.Player2 = data.player;
    });
    this.winnerMessage = new Wins();
    this.stopGame= false;
    this.playerTocheck = true;
    this.firstSelection = false;
    this.secondSelection = false;
    this.rounds = 0;
  }

  OnCheck(check){
    if (this.rounds < 5) {

      this.firstSelected = new Player();
      this.secondSelected = new Player();

      if (this.playerTocheck == true) {
        this.firstSelected = this.getFirstSelection(check);
        this.firstSelection = true;
        if (this.Player2 == Players.Computer) {
          this.secondSelected = this.getRandom();
          this.secondSelection = true;
        }
      }
      else if (this.playerTocheck == false) {
        if (this.Player2 == Players.Player2) {
          this.secondSelected = this.getSecondSelection(check);
          this.secondSelection = true;
        }
      }

      this.playersArrays();

      if (this.firstSelection && this.secondSelection) {
        this.rounds++;
        this.firstSelection = false;
        this.secondSelection = false;
      }

      if (this.rounds == 5 ){
        this.stopGame= true;
      }
    }
  }

  OnReplay(){
    this.router.navigate(["main"]);
  }

  getFirstSelection(check){
    this.firstSelected.Player = Players.Player;
    this.firstSelected.Options = check;
    this.playerTocheck = !this.playerTocheck;

    return this.firstSelected;
  }

  getSecondSelection(check){
    this.secondSelected.Player = Players.Player2;
    this.secondSelected.Options = check;
    this.playerTocheck = !this.playerTocheck;

    return this.secondSelected;
  }

  getRandom(){
    this.computerNumber = Math.floor((Math.random() * 3) + 1);
    this.secondSelected.Player = Players.Computer;
    if (this.computerNumber == 1){
      this.secondSelected.Options  = Options.Rock;
    } else if (this.computerNumber == 2){
      this.secondSelected.Options  = Options.Paper;
    } else if (this.computerNumber == 3){
      this.secondSelected.Options  = Options.Scissors;
    }
    this.playerTocheck = !this.playerTocheck;

    return this.secondSelected;
  };

  playersArrays(){
    if (this.firstSelected.Options){
      this.firstSelectionArray.push(this.firstSelected.Options);
    }
    if (this.secondSelected.Options){
      this.secondSelectionArray.push(this.secondSelected.Options);
    }

  }

  receiveWinner($event){
    this.winnerMessage = $event;
  }

}
