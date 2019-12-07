export class Airplane {
    id?: number;
    timeGeral?: Date;
    takeoff?: Date;
    landing?: Date;

    constructor(init?: Partial<Airplane>) {
        Object.assign(this, init);
    }
}
