import { Component, OnInit } from '@angular/core';
import { Airplane } from './airplane.model';
import { Gate } from './gate.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public airplanes = [];

  public gates = [
    new Gate({ id: 1, state: true, airplane: undefined }),
    new Gate({ id: 2, state: true, airplane: undefined }),
    new Gate({ id: 3, state: true, airplane: undefined }),
    new Gate({ id: 4, state: true, airplane: undefined }),
  ];

  totalAirplanes = [];

  canContinue = true;

  constructor() { }

  ngOnInit() {
    this.gates.forEach(gate => gate.airplane = new Airplane({ timeGeral: new Date() }));
  }

  public gerarList() {
    const r = Math.floor(Math.random() * 100);
    let cont = 0;

    const int = setInterval(() => {
      this.airplanes.push(new Airplane({
        id: cont,
        timeGeral: new Date()
      }));

      cont++;

      if (cont === r) {
        clearInterval(int);
      }

    }, 1000);
  }

}


