class HarvestPlaner extends Planer {
    plan(): void {
        for (var name in Game.creeps) {
            if(name.split('_')[0] == "Worker")
            {
                this.RunCreep(Game.creeps[name]);
            }
        }
    }

    RunCreep(creep: Creep) {

        if(!creep.memory.RoundRobin)
        {
            creep.memory.RoundRobin = 0;
        }

        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find<Source>(FIND_SOURCES);
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
        else {
            var targets = creep.room.find<RoomObject>(FIND_STRUCTURES, {
                filter: (structure: RoomObject) => {
                    var stru : Source = structure as Source;
                    var strut : Structure = structure as Structure;
                    return (strut.structureType == STRUCTURE_EXTENSION ||
                        strut.structureType == STRUCTURE_SPAWN ||
                        strut.structureType == STRUCTURE_TOWER || 
                        strut.structureType == STRUCTURE_CONTAINER && stru.energy < stru.energyCapacity);
                }
            });
            if (targets.length > 0 && (targets[creep.memory.RoundRobin] as Source).energy <  (targets[creep.memory.RoundRobin] as Source).energyCapacity) {

                var ret = creep.transfer((targets[creep.memory.RoundRobin] as Structure), RESOURCE_ENERGY);

                if (ret == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(targets[creep.memory.RoundRobin]);
                }
                else
                {
                    if(creep.memory.RoundRobin >= targets.length)
                    {
                        creep.memory.RoundRobin++; 
                    }
                }                
            }
            else
            {
                creep.moveTo(Game.flags['Bord']);
            }
        }
    }
}