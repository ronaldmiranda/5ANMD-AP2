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

    setTimeout(() => {
      setInterval(() => {
        this.checkIfGateIsAvailable(new Airplane());
      }, 1000);
    }, 5000);

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

  private checkIfGateIsAvailable(airplane: Airplane) {
    this.gates.forEach(gate => {
      if (gate.state) {
        gate.airplane.landing = new Date();
        this.putAirplaneIntoAGate(gate);
      }
    });
  }

  private putAirplaneIntoAGate(gate: Gate) {

    const r = Math.floor(Math.random() * 10) + 5;

    setTimeout(() => {
      const airplane = this.airplanes.filter((v, i) => i === 0)[0];
      this.airplanes = this.airplanes.filter((v, i) => i !== 0);
      gate.state = false;

      const r2 = Math.floor(Math.random() * 10) + 5;


      setTimeout(() => {
        this.getAirplaneOutGate(gate);
      }, r2 * 1000);
    }, r * 1000);

  }

  private getAirplaneOutGate(gate: Gate) {
    const airplane = Object.assign(new Airplane(), gate.airplane, {
      takeoff: new Date()
    });

    this.gates = this.gates.filter(gate2 => gate2.airplane.id !== gate.airplane.id);
    gate.airplane = undefined;
    gate.state = true;

    this.totalAirplanes.push(airplane);
    this.airplanes.push(airplane);
  }

}


