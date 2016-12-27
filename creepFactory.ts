//Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], 'Worker1');

class CreepFactory extends Factory {

    CreateUnit(name: string, parms : any[]) {
        Game.spawns[this.cfg.MainSpawn].createCreep(parms, name + '_' + Factory.GlobalUnitCount++ + Math.random());
    }



    CollectGarbage() {
        for (var m in Memory.creeps) {
            if (!(m in Game.creeps)) {
                delete Memory.creeps[m];
            }
        }
    }

    GetCount(name: string) : number
    {
        var re : number = 0;

        for(var i in Game.creeps)
        {
            if(Game.creeps[i].name.split('_')[0] == name)
            {
                re++;
            }
        }

        return re;
    }

    FactoryLogic() {
        
        for(var creep of this.cfg.creepConfig)
        {
            var count = this.GetCount(creep.Name);            
            if(count <= creep.Max)
            {
                
                this.CreateUnit(creep.Name, creep.CreepBody);
            }            
        }
    }
}