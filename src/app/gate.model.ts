import { Airplane } from './airplane.model';

export class Gate {
    id: number;
    state: boolean;
    airplane?: Airplane;

    constructor(init?: Partial<Gate>) {
        Object.assign(this, init);
    }
}
