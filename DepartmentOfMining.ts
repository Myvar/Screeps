class DepartmentOfMining extends Department {


    Init(): void {
        if (!this.ram) {
            this.ram = new Ram(this.room, "DepartmentOfMining");
        }

        if (!this.ram.Get<boolean>("init")) {
            this.ram.Set("init", true);

        }
    }

    //tasks of this Department
    /* 
        mine source and place it in container
    */


    Logic() {
        var FindIndex = [FIND_SOURCES];


       

        for (var find of FindIndex) {
            var targets = Game.rooms[this.room].find<Source>(find);
            for (var target of targets) {
                var ready = this.StructurePage.GetProp<boolean>(target.id, "hasBuffer");
                
                if (ready) {
                    
                    if (!this.hasMiner(target.id)) {
                        console.log("i am ready");
                        var miner = Game.creeps[this.getMiner()];
                        if(miner)
                        {
                            miner.memory.Mine = target.id;
                            miner.memory.Source = target.id;
                        }
                    }
                }
            }
        }
    }

    hasMiner(id: string): boolean {
        for (var i in Game.creeps) {
            var creep = Game.creeps[i];
            if (creep.memory.Mine == id) {
                return true;
            }
        }

        return false;
    }

    getMiner(): string {
        for (var i in Game.creeps) {
            var creep = Game.creeps[i];
            if (creep.memory.Mine == "" && creep.memory.Employer == "Miner") {
                return i;
            }
        }

        this.PublicNetwork.CreateLaborer("Miner");

        return "";
    }


    GC(): void {

    }
}