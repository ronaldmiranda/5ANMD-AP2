import { Component, OnInit } from '@angular/core';
import { Airplane } from './airplane.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public airplanes = [];

  public gates = [
    { id: 1, state: true, airplane: undefined },
    { id: 2, state: true, airplane: undefined },
    { id: 3, state: true, airplane: undefined },
    { id: 4, state: true, airplane: undefined },
  ];

  totalAirplanes = [];

  canContinue = true;

  constructor() { }

  ngOnInit() {
    // Ini
    this.gates.forEach(gate => gate.airplane = new Airplane({ timeGeral: new Date() }));
  }

  public gerarList() {
    const r = Math.floor(Math.random() * 100);
    let cont = 0;

    setTimeout(() => {
      setInterval(() => {
        const airplane = new Airplane();
        this.checkIfGateIsAvailable(airplane);

      }, 1000);
    }, 5000);

    const int = setInterval(() => {
      this.airplanes.push(Object.assign(new Airplane({
        id: cont,
        timeGeral: new Date()
      })));

      cont++;
      if (cont === r) {
        clearInterval(int);
      }
    }, 1000);
  }

  private checkIfGateIsAvailable(airplane: Airplane) {
    this.gates.forEach(gate => {
      if (gate.state) {
        this.putAirplaneIntoAGate(gate, airplane);
      }
    });
  }

  private putAirplaneIntoAGate(gate: any, airplaneToGate: Airplane) {

    const r = Math.floor(Math.random() * 10) + 5;

    setTimeout(() => {
      const airplane = this.airplanes.filter((v, i) => i === 0)[0];
      this.airplanes = this.airplanes.filter((v, i) => i !== 0);

      gate.airplane = airplaneToGate;
      gate.state = false;

      const r2 = Math.floor(Math.random() * 10) + 21;


      setTimeout(() => {
        this.getAirplaneOutGate(gate);
      }, r2 * 1000);
    }, r * 1000);

  }

  private getAirplaneOutGate(gate) {
    const airplane = gate.airplane;
    gate.airplane = undefined;
    gate.state = true;

    this.totalAirplanes.push(airplane);
    this.airplanes.push(airplane);
  }

}


