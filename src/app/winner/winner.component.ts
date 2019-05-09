import {Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';

import { Wins } from '../models/wins';
import { Player } from '../models/player';

const enum Options {
  Rock= "Rock",
  Paper="Paper",
  Scissors="Scissors"
}
const enum Result {
  Draw = "Draw",
  FirstPlayerWins = "First Player Wins",
  SecondPlayerWins = "Second Player Wins"

}
const enum Players{
  Player = "Player2",
  Computer = "Computer"
}

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})


export class WinnerComponent implements OnInit,OnChanges {

  @Input() firstSelected : Player;
  @Input() secondSelected : Player;
  @Input() Player2 : any;
  @Input() playerTocheck : boolean;

  @Output() winnerMessage = new EventEmitter<string>();

  public message: string;
  public wins : Wins;
  public firstSelectionValue : any;
  public secondSelectionValue : any;

  constructor() {
    this.wins = new Wins();
  }

  ngOnInit() {
    this.wins.secondPlayerWin= 0;
    this.wins.firstPlayerWin= 0;
    this.wins.draw= 0;
    if (this.firstSelected && this.secondSelected ) {
      this.getValues();
    }
  }

  ngOnChanges(){
    if (this.firstSelected && this.secondSelected ) {
      this.getValues();
    }
  }

  // get values each user have selected
  getValues(){
    if ( this.Player2 == Players.Computer){

      this.firstSelectionValue = this.firstSelected.Options;
      this.secondSelectionValue = this.secondSelected.Options;
      this.setPoints( this.firstSelectionValue, this.secondSelectionValue);
    }else if (this.Player2 == Players.Player) {

      if (this.playerTocheck){
        this.secondSelectionValue = this.secondSelected.Options;
        this.setPoints( this.firstSelectionValue, this.secondSelectionValue);
      }else {
        this.firstSelectionValue = this.firstSelected.Options;
      }
    }

  }

  // set the points to each user
  setPoints(firstSelectionValue , secondSelectionValue){

    if (firstSelectionValue == secondSelectionValue) {
      this.wins.draw++
    } else if (firstSelectionValue == Options.Rock && secondSelectionValue == Options.Paper) {
      this.wins.secondPlayerWin++;
    }else if (firstSelectionValue == Options.Paper && secondSelectionValue == Options.Scissors) {
      this.wins.secondPlayerWin++;
    }else if (firstSelectionValue == Options.Scissors && secondSelectionValue == Options.Rock) {
      this.wins.secondPlayerWin++;
    }else {
      this.wins.firstPlayerWin++;
    }
    this.choseWinner(this.wins);

  }

  choseWinner(wins){
    if (wins.firstPlayerWin == wins.secondPlayerWin) {
        this.message = Result.Draw;
    }else if (wins.firstPlayerWin > wins.secondPlayerWin){
      this.message = Result.FirstPlayerWins;
    }else if (wins.firstPlayerWin < wins.secondPlayerWin) {
      this.message = Result.SecondPlayerWins;
    }
    this.winnerMessage.emit( this.message);
  }
}
