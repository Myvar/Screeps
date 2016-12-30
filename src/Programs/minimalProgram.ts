import p = require("program");

/// <reference path="../../imports/screeps.d.ts" />

class MinimalProgram extends p.Program {

    private MAX_CREEPS = 10;

    Execute() {

        var count = 0;

        for (var c in Game.creeps) {
            var creep = Game.creeps[c];
            if (creep.room.name = this.room) {
                count++;
                this.creepFillSpawn(creep);
            }
        }

        if(count < this.MAX_CREEPS)
        {
            Game.rooms[this.room].find<Spawn>(FIND_MY_SPAWNS)[0].createCreep([WORK, CARRY, MOVE], "aCreep_" + String(Math.random()).split('.')[1]);
        }
    }

    creepBord(creep: Creep) {
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
            var sources = creep.room.find<Source>(FIND_SOURCES);

            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }

    creepFillSpawn(creep: Creep) {
        if (!creep.memory.RoundRobin) {
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
                    var stru: Source = structure as Source;
                    var strut: Structure = structure as Structure;
                    return (strut.structureType == STRUCTURE_EXTENSION ||
                        strut.structureType == STRUCTURE_SPAWN ||
                        strut.structureType == STRUCTURE_TOWER ||
                        strut.structureType == STRUCTURE_CONTAINER && stru.energy < stru.energyCapacity);
                }
            });
            if (targets.length > 0 && (targets[creep.memory.RoundRobin] as Source).energy < (targets[creep.memory.RoundRobin] as Source).energyCapacity) {
                var ret = creep.transfer((targets[creep.memory.RoundRobin] as Structure), RESOURCE_ENERGY);

                if (ret == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[creep.memory.RoundRobin]);
                }
                else {
                    if (creep.memory.RoundRobin >= targets.length) {
                        creep.memory.RoundRobin++;
                    }
                }
            }
            else {
                this.creepBord(creep);
            }
        }
    }
}

module.exports = MinimalProgram;
