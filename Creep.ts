class Creeps {
    Tick() {
        for (var i in Game.creeps) {
            this.RunCreep(i);
        }
    }
    public StructurePage: StructurePage = new StructurePage();
    public PublicNetwork: PublicNetwork = new PublicNetwork();
    RunCreep(name: string) {
        var creep = Game.creeps[name];

        //just for now
        if (creep.memory.Bord) {
            this.Bord(creep);
        }

        switch (creep.memory.Employer) {
            case "Builder":
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
                        creep.memory.Bord = false;
                        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                        }
                    }
                    else {
                        creep.memory.Source = "";
                        creep.memory.Bord = true; // this creep has no work to do let it do a nother task
                    }
                }
                else {
                    if (creep.memory.ActiveProvider && creep.memory.ActiveProvider == "") {
                        var sources = creep.room.find<Source>(FIND_SOURCES,
                            {
                                filter: (structure: RoomObject) => {
                                    var stru: Source = structure as Source;

                                    return stru.id == creep.memory.Source;
                                }
                            });

                        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources[0]);
                        }
                    }
                    else {
                        var buffers = creep.room.find<Container>(FIND_STRUCTURES,
                            {
                                filter: (structure: RoomObject) => {
                                    var stru: Container = structure as Container;

                                    return stru.id == creep.memory.ActiveProvider;
                                }
                            });

                        if (creep.withdraw(buffers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(buffers[0]);
                        }
                    }
                }
                break;
            case "Miner":
                if (creep.memory.building && creep.carry.energy == 0) {
                    creep.memory.building = false;
                    creep.say('harvesting');
                }
                if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                    creep.memory.building = true;
                    creep.say('Transfering');
                }

                if (creep.memory.building) {
                    var target: StructureContainer = this.GetSourceContainer(creep);

                    if (target) {
                        creep.memory.Bord = false;
                        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }
                    else {
                        creep.memory.Bord = true; // this creep has no work to do let it do a nother task
                    }
                }
                else {

                    var sources = creep.room.find<Source>(FIND_SOURCES,
                        {
                            filter: (structure: RoomObject) => {
                                var stru: Source = structure as Source;

                                return stru.id == creep.memory.Mine;
                            }
                        });

                    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0]);
                    }
                }
                break;
        }
    }


    GetSourceContainer(creep: Creep): StructureContainer {
        return Game.getObjectById<StructureContainer>(this.StructurePage.GetProp<string>(creep.memory.Mine, "BufferID"));
    }

    Bord(creep: Creep) {
        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var sources = creep.room.find<Source>(FIND_SOURCES,
                {
                    filter: (structure: RoomObject) => {
                        var stru: Source = structure as Source;

                        return stru.id == creep.memory.Source;
                    }
                });
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
}