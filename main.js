var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Planer = (function () {
    function Planer() {
    }
    Planer.prototype.plan = function () {
    };
    return Planer;
}());
var Config = (function () {
    function Config() {
        this.creepConfig = [
            {
                Name: "Worker",
                CreepBody: [WORK, CARRY, MOVE],
                Min: 2,
                Max: 2
            },
            {
                Name: "Upgrader",
                CreepBody: [WORK, CARRY, MOVE],
                Min: 1,
                Max: 1
            },
            {
                Name: "builder",
                CreepBody: [WORK, CARRY, MOVE],
                Min: 2,
                Max: 2
            },
            {
                Name: "repear",
                CreepBody: [WORK, CARRY, MOVE],
                Min: 1,
                Max: 1
            }
        ];
        this.MainSpawn = "Spawn1";
    }
    return Config;
}());
var Factory = (function () {
    function Factory(cfg) {
        this.cfg = cfg;
    }
    Factory.prototype.CreateUnit = function (name, params) {
        console.log("Generic Factory Creating Unit");
    };
    Factory.prototype.CollectGarbage = function () {
        console.log("Generic Factory Collecting Garbage");
    };
    Factory.prototype.FactoryLogic = function () {
        console.log("Generic Factory Logic");
    };
    Factory.prototype.Tick = function () {
        this.CollectGarbage();
        this.FactoryLogic();
    };
    return Factory;
}());
Factory.GlobalUnitCount = 0;
var CreepFactory = (function (_super) {
    __extends(CreepFactory, _super);
    function CreepFactory() {
        return _super.apply(this, arguments) || this;
    }
    CreepFactory.prototype.CreateUnit = function (name, parms) {
        Game.spawns[this.cfg.MainSpawn].createCreep(parms, name + '_' + Factory.GlobalUnitCount++ + Math.random());
    };
    CreepFactory.prototype.CollectGarbage = function () {
        for (var m in Memory.creeps) {
            if (!(m in Game.creeps)) {
                delete Memory.creeps[m];
            }
        }
    };
    CreepFactory.prototype.GetCount = function (name) {
        var re = 0;
        for (var i in Game.creeps) {
            if (Game.creeps[i].name.split('_')[0] == name) {
                re++;
            }
        }
        return re;
    };
    CreepFactory.prototype.FactoryLogic = function () {
        for (var _i = 0, _a = this.cfg.creepConfig; _i < _a.length; _i++) {
            var creep = _a[_i];
            var count = this.GetCount(creep.Name);
            if (count <= creep.Max) {
                this.CreateUnit(creep.Name, creep.CreepBody);
            }
        }
    };
    return CreepFactory;
}(Factory));
var ServiceExecutionRule;
(function (ServiceExecutionRule) {
    ServiceExecutionRule[ServiceExecutionRule["EveryTick"] = 0] = "EveryTick";
    ServiceExecutionRule[ServiceExecutionRule["Interval"] = 1] = "Interval";
    ServiceExecutionRule[ServiceExecutionRule["Event"] = 2] = "Event";
})(ServiceExecutionRule || (ServiceExecutionRule = {}));
var Ticker = (function () {
    function Ticker() {
        this.Services = [];
    }
    Ticker.prototype.addService = function (serv) {
        this.Services.push(serv);
    };
    Ticker.prototype.fireEvent = function (eventName) {
        for (var _i = 0, _a = this.Services; _i < _a.length; _i++) {
            var serv = _a[_i];
            if (serv.ExecutionRule == ServiceExecutionRule.Event) {
                if (eventName == serv.eventName) {
                    serv.Execute();
                }
            }
        }
    };
    Ticker.prototype.tick = function () {
        for (var _i = 0, _a = this.Services; _i < _a.length; _i++) {
            var serv = _a[_i];
            if (serv.ExecutionRule == ServiceExecutionRule.EveryTick) {
                serv.Execute();
            }
            if (serv.ExecutionRule == ServiceExecutionRule.Interval) {
                serv.tick();
            }
        }
    };
    return Ticker;
}());
var Service = (function () {
    function Service(func) {
        this.method = func;
        this.ExecutionRule = ServiceExecutionRule.EveryTick;
    }
    Service.prototype.tick = function () {
        if (this.intervalsDone >= this.interval) {
            this.Execute();
            this.intervalsDone = 0;
        }
        this.intervalsDone++;
    };
    Service.prototype.Execute = function () {
        this.method();
    };
    return Service;
}());
var HarvestPlaner = (function (_super) {
    __extends(HarvestPlaner, _super);
    function HarvestPlaner() {
        return _super.apply(this, arguments) || this;
    }
    HarvestPlaner.prototype.plan = function () {
        for (var name in Game.creeps) {
            if (name.split('_')[0] == "Worker") {
                this.RunCreep(Game.creeps[name]);
            }
        }
    };
    HarvestPlaner.prototype.RunCreep = function (creep) {
        if (!creep.memory.RoundRobin) {
            creep.memory.RoundRobin = 0;
        }
        if (creep.carry.energy < creep.carryCapacity) {
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
                var ret = creep.transfer(targets[creep.memory.RoundRobin], RESOURCE_ENERGY);
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
                creep.moveTo(Game.flags['Bord']);
            }
        }
    };
    return HarvestPlaner;
}(Planer));
var upgraderPlaner = (function (_super) {
    __extends(upgraderPlaner, _super);
    function upgraderPlaner() {
        return _super.apply(this, arguments) || this;
    }
    upgraderPlaner.prototype.plan = function () {
        for (var name in Game.creeps) {
            if (name.split('_')[0] == "Upgrader") {
                this.RunCreep(Game.creeps[name]);
            }
        }
    };
    upgraderPlaner.prototype.RunCreep = function (creep) {
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
    return upgraderPlaner;
}(Planer));
var builderPlaner = (function (_super) {
    __extends(builderPlaner, _super);
    function builderPlaner() {
        return _super.apply(this, arguments) || this;
    }
    builderPlaner.prototype.plan = function () {
        for (var name in Game.creeps) {
            if (name.split('_')[0] == "builder") {
                this.RunCreep(Game.creeps[name]);
            }
        }
    };
    builderPlaner.prototype.RunCreep = function (creep) {
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
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length > 0) {
                if (creep.build(targets[creep.memory.RoundRobin]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[creep.memory.RoundRobin]);
                }
                if (targets[creep.memory.RoundRobin].progress >= targets[creep.memory.RoundRobin].progressTotal) {
                    if (creep.memory.RoundRobin >= targets.length) {
                        creep.memory.RoundRobin++;
                    }
                }
            }
            else {
                creep.moveTo(Game.flags['Bord']);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    };
    return builderPlaner;
}(Planer));
var repearPlaner = (function (_super) {
    __extends(repearPlaner, _super);
    function repearPlaner() {
        return _super.apply(this, arguments) || this;
    }
    repearPlaner.prototype.plan = function () {
        for (var name in Game.creeps) {
            if (name.split('_')[0] == "repear") {
                this.RunCreep(Game.creeps[name]);
            }
        }
    };
    repearPlaner.prototype.RunCreep = function (creep) {
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
            var targate = creep.room.find(FIND_STRUCTURES, {
                filter: function (structure) {
                    var strut = structure;
                    return (strut.hits < strut.hitsMax);
                }
            });
            if (targate.length > 0) {
                if (creep.repair(targate[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targate[0]);
                }
            }
        }
    };
    return repearPlaner;
}(Planer));
var servies = new Ticker();
var cfg = new Config();
var creepFact = new CreepFactory(cfg);
var HarvestPlan = new HarvestPlaner();
var upgraderPlan = new upgraderPlaner();
var builderPlan = new builderPlaner();
var repearPlan = new repearPlaner();
servies.addService(new Service(function () { creepFact.Tick(); }));
servies.addService(new Service(function () { HarvestPlan.plan(); }));
servies.addService(new Service(function () { upgraderPlan.plan(); }));
servies.addService(new Service(function () { builderPlan.plan(); }));
servies.addService(new Service(function () { repearPlan.plan(); }));
module.exports.loop = function () {
    servies.tick();
};
