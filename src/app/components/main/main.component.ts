import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  public minutes: number = 25;
  public seconds: any = 0;

  public minutesText: string = "25";
  public secondsText: string = "00";

  public pauseText: string = "Pause";
  public pause: boolean = false;
  public clearTime: boolean = false;
  public counting: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  public play(){
    if(!this.counting){
      this.counting = true;
      this.pause = false;
      this.start();
    }
    else{
      this.counting = false;
      this.pause = true;
    }
  }

  public start(){
    new Promise(resolve => {
      setTimeout(() => {
        
        if(!this.pause && !this.clearTime){

          if(this.seconds > 0){
            this.seconds -= 1;
            // this.secondsText = this.convertSeconds(this.seconds);

            this.start();
          }else{
            if(this.minutes > 0){
              this.minutes -= 1;
              this.seconds = 59;
              this.start();
            }
          }
        }
        else if(this.clearTime){
          this.minutes = 25;
          this.seconds = 0;
          this.clearTime = false;
        }

        this.minutesText = this.convertTime(this.minutes);
        this.secondsText = this.convertTime(this.seconds);
        
        resolve(true);
      }, 1000)
    })
  }
    
  public clear(){
    this.clearTime = true;
    this.counting = false;

    if(this.pause){
      this.minutes = 25;
      this.seconds = 0;
      this.pause = false;
      this.clearTime = false;

      this.minutesText = this.convertTime(this.minutes);
      this.secondsText = this.convertTime(this.seconds);
    }
    
  }

  private convertTime(seconds: number){
    var result = "";
    if(seconds < 10){
      result = "0" + seconds.toString();
    }
    else{
      result = seconds.toString();
    }

    return result;
  }
}
