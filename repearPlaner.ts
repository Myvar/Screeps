class repearPlaner extends Planer {
    plan(): void {
        for (var name in Game.creeps) {
            if (name.split('_')[0] == "repear") {
                this.RunCreep(Game.creeps[name]);
            }
        }
    }

    RunCreep(creep: Creep) {

        if (!creep.memory.reparing) {
            creep.memory.reparing = false;
        }


        if (creep.memory.reparing && creep.carry.energy == 0) {
            creep.memory.reparing = false;
            creep.say('harvesting');
        }
        if (!creep.memory.reparing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.reparing = true;
            creep.say('reparing');
        }

        if (creep.memory.reparing) {
           // var targate = creep.room.find<Structure>(FIND_STRUCTURES).sort(function (a, b) { return a.hits - b.hits; })[0];
            var targate : Structure[] = creep.room.find<RoomObject>(FIND_STRUCTURES, {
                filter: (structure: RoomObject) => {
                    var strut : Structure = structure as Structure;
                    return (strut.hits < strut.hitsMax);
                }
            }) as Structure[] ;

            if (targate.length > 0) {

                if (creep.repair(targate[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targate[0]);
                }
            }
             //   else {
           // creep.moveTo(Game.flags['Bord']);
          //  }
        }
        


    }
}