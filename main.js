var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Config = (function () {
    function Config() {
        this.creepConfig = [
            {
                Name: "Worker",
                CreepBody: [WORK, CARRY, MOVE],
                Min: 5,
                Max: 5
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
var servies = new Ticker();
var cfg = new Config();
var creepFact = new CreepFactory(cfg);
servies.addService(new Service(function () { creepFact.Tick(); }));
module.exports.loop = function () {
    servies.tick();
};
