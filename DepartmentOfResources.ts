class DepartmentOfResources extends Department {


    Init(): void {
        if (!this.ram) {
            this.ram = new Ram(this.room, "DepartmentOfResources");
        }

        if (!this.ram.Get<boolean>("init")) {
            this.ram.Set("init", true);
            this.ram.Set("active", false);
            this.ram.Set("pasive", false);
            this.publicpage.Set("ProvideSourceQueue", [])
        }
    }

    //tasks of this Department
    /* 
        Manage Depos
        Determin the best source for a creep
    */

    ProvideCreepWithSource(name: string) {
        //sources include
        /*
            Source(mine)
            Pasive Provider (containers) (depo)
            Active Provider (containers)
        */
        if (this.ram.Get<Boolean>("pasive")) {
            //first try depo
           // return;
        }

        //then finaly try source block it self
        Game.creeps[name].memory.Source = this.getBestSourceBlock().id;

        if(this.StructurePage.GetProp(Game.creeps[name].memory.Source, "BufferID"))      
        {
            console.log("Found active provider");
            Game.creeps[name].memory.ActiveProvider = this.StructurePage.GetProp(Game.creeps[name].memory.Source, "BufferID");
        }  

    }

    getBestSourceBlock() {
        var re: Source;
        var c: number = 255;

        var targets = Game.rooms[this.room].find<Source>(FIND_SOURCES);
        for (var targ of targets) {
            var myc = 0;
            for (var cr in Game.creeps) {
                var creep = Game.creeps[cr];
                if (creep.room.name == this.room) //only use creeps that are actualy in this room
                {
                    if (creep.memory.Source == targ.id) {
                        myc++;
                    }
                }
            }

            if(myc < c)
            {
                re = targ;
                c = myc;
            }
        }

        return re;
    }

    Logic() {
        this.Depo();

        var queue = this.publicpage.Get<string[]>("ProvideSourceQueue");
        for (var i of queue) {
            this.ProvideCreepWithSource(i);
            var index = queue.indexOf(i);
            if (index > -1) {
                queue.splice(index, 1);
            }
            return; //return for now TODO: this should remove things without breaking loop
        }
    }

    Depo() {

    }

    GC(): void {

    }
}