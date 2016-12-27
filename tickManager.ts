enum ServiceExecutionRule {
    EveryTick,
    Interval,
    Event
}

class Ticker {
    public Services: Service[] = [];

    addService(serv: Service): void {
        this.Services.push(serv);
    }

    fireEvent(eventName: string): void {
        for (var serv of this.Services) {
            if (serv.ExecutionRule == ServiceExecutionRule.Event) {
                if (eventName == serv.eventName) {
                    serv.Execute();
                }
            }

        }
    }

    tick(): void {
        for (var serv of this.Services) {
            if (serv.ExecutionRule == ServiceExecutionRule.EveryTick) {
                serv.Execute();
            }
            if (serv.ExecutionRule == ServiceExecutionRule.Interval) {
                serv.tick();
            }
        }
    }
}

class Service {
    public ExecutionRule: ServiceExecutionRule;
    public method: Function;
    public interval: number;
    public intervalsDone: number;
    public eventName: string;

    constructor(func?: Function) {
        this.method = func;
        this.ExecutionRule = ServiceExecutionRule.EveryTick;
    }

    tick() {
        if (this.intervalsDone >= this.interval) {
            this.Execute();
            this.intervalsDone = 0;
        }
        this.intervalsDone++;
    }

    Execute(): void {
        this.method();
    }
}

