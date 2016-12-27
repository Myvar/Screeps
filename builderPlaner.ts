class builderPlaner extends Planer {
    plan(): void {
        for (var name in Game.creeps) {
            if (name.split('_')[0] == "builder") {
                this.RunCreep(Game.creeps[name]);
            }
        }
    }

    RunCreep(creep: Creep) {

        if (!creep.memory.RoundRobin) {
            creep.memory.RoundRobin = 0;
        }


        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if (creep.memory.building) {
            var targets = creep.room.find<ConstructionSite>(FIND_CONSTRUCTION_SITES);
            if (targets.length > 0) {
                if (creep.build(targets[creep.memory.RoundRobin]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[creep.memory.RoundRobin]);
                }
                if(targets[creep.memory.RoundRobin].progress >= targets[creep.memory.RoundRobin].progressTotal) {
                    if (creep.memory.RoundRobin >= targets.length) {
                        creep.memory.RoundRobin++;
                    }
                }
            }
            else
            {
                creep.moveTo(Game.flags['Bord']);
            }
        }
        else {
            var sources = creep.room.find<Source>(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
}