class DeparmentOfLabor extends Department {


    Init(): void {
        if (!this.ram) {
            this.ram = new Ram(this.room, "DepartmentOfLabor");
        }

        if (!this.ram.Get<boolean>("init")) {
            this.ram.Set("init", true);
            this.ram.Set("totalcreeps", 0);
            this.publicpage.Set("CreateLaborerQueue", [])
        }
    }

    CreateLaborer(employer: string): string {
        //later we can write code that decides on the generic body size of the creeps
        var body = [WORK, CARRY, MOVE];

        var Name: string = getName();
        Game.spawns["Spawn1"].createCreep(body, Name, {
            Employer: employer, UID: String(Math.random()), // basic info
            //meta info
            Source: "",
            Bord: false,
            Mine: "",
            ActiveProvider: ""
        });
        this.ram.Set("totalcreeps", this.ram.Get<number>("totalcreeps") + 1);

        return Name;
    }

    Logic() {
        var queue = this.publicpage.Get<string[]>("CreateLaborerQueue");
        for (var i of queue) {
            this.CreateLaborer(i);
            var index = queue.indexOf(i);
            if (index > -1) {
                queue.splice(index, 1);
            }
            return; //return for now TODO: this should remove things without breaking loop
        }
    }

    GC(): void {
        for (var m in Memory.creeps) {
            if (!(m in Game.creeps)) {
                delete Memory.creeps[m];
            }
        }
    }
}