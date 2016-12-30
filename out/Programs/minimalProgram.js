"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var p = require("program");
var MinimalProgram = (function (_super) {
    __extends(MinimalProgram, _super);
    function MinimalProgram() {
        var _this = _super.apply(this, arguments) || this;
        _this.MAX_CREEPS = 10;
        return _this;
    }
    MinimalProgram.prototype.Execute = function () {
        var count = 0;
        for (var c in Game.creeps) {
            var creep = Game.creeps[c];
            if (creep.room.name = this.room) {
                count++;
                this.creepFillSpawn(creep);
                if (creep.memory.bord) {
                    this.creepBord(creep);
                }
            }
        }
        if (count < this.MAX_CREEPS) {
            Game.rooms[this.room].find(FIND_MY_SPAWNS)[0].createCreep([WORK, CARRY, MOVE], "aCreep_" + String(Math.random()).split('.')[1]);
        }
        var hostiles = Game.rooms[this.room].find(FIND_HOSTILE_CREEPS);
        if (hostiles.length > 0) {
            Game.rooms[this.room].controller.activateSafeMode();
        }
    };
    MinimalProgram.prototype.creepBord = function (creep) {
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
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    };
    MinimalProgram.prototype.creepFillSpawn = function (creep) {
        if (!creep.memory.RoundRobin) {
            creep.memory.RoundRobin = 0;
        }
        if (!creep.memory.bord && creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: function (structure) {
                    var stru = structure;
                    var strut = structure;
                    return (strut.structureType == STRUCTURE_EXTENSION ||
                        strut.structureType == STRUCTURE_SPAWN ||
                        strut.structureType == STRUCTURE_TOWER ||
                        strut.structureType == STRUCTURE_CONTAINER && stru.energy < stru.energyCapacity);
                }
            });
            if (targets.length > 0 && targets[creep.memory.RoundRobin].energy < targets[creep.memory.RoundRobin].energyCapacity) {
                creep.memory.bord = false;
                var ret = creep.transfer(targets[creep.memory.RoundRobin], RESOURCE_ENERGY);
                if (ret == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[creep.memory.RoundRobin]);
                }
                else {
                    if (creep.memory.RoundRobin >= targets.length) {
                        creep.memory.RoundRobin = 0;
                    }
                }
            }
            else {
                creep.memory.bord = true;
            }
        }
    };
    return MinimalProgram;
}(p.Program));
module.exports = MinimalProgram;
