var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var left = ["admiring",
    "adoring",
    "agitated",
    "amazing",
    "angry",
    "awesome",
    "backstabbing",
    "berserk",
    "big",
    "boring",
    "clever",
    "cocky",
    "compassionate",
    "condescending",
    "cranky",
    "desperate",
    "determined",
    "distracted",
    "dreamy",
    "drunk",
    "ecstatic",
    "elated",
    "elegant",
    "evil",
    "fervent",
    "focused",
    "furious",
    "gigantic",
    "gloomy",
    "goofy",
    "grave",
    "happy",
    "high",
    "hopeful",
    "hungry",
    "insane",
    "jolly",
    "jovial",
    "kickass",
    "lonely",
    "loving",
    "mad",
    "modest",
    "naughty",
    "nauseous",
    "nostalgic",
    "pedantic",
    "pensive",
    "prickly",
    "reverent",
    "romantic",
    "sad",
    "serene",
    "sharp",
    "sick",
    "silly",
    "sleepy",
    "small",
    "stoic",
    "stupefied",
    "suspicious",
    "tender",
    "thirsty",
    "tiny",
    "trusting",
];
var right = [
    "albattani",
    "allen",
    "almeida",
    "agnesi",
    "archimedes",
    "ardinghelli",
    "aryabhata",
    "austin",
    "babbage",
    "banach",
    "bardeen",
    "bartik",
    "bassi",
    "bell",
    "bhabha",
    "bhaskara",
    "blackwell",
    "bohr",
    "booth",
    "borg",
    "bose",
    "boyd",
    "brahmagupta",
    "brattain",
    "brown",
    "carson",
    "chandrasekhar",
    "shannon",
    "colden",
    "cori",
    "cray",
    "curran",
    "curie",
    "darwin",
    "davinci",
    "dijkstra",
    "dubinsky",
    "easley",
    "einstein",
    "elion",
    "engelbart",
    "euclid",
    "euler",
    "fermat",
    "fermi",
    "feynman",
    "franklin",
    "galileo",
    "gates",
    "goldberg",
    "goldstine",
    "goldwasser",
    "golick",
    "goodall",
    "hamilton",
    "hawking",
    "heisenberg",
    "heyrovsky",
    "hodgkin",
    "hoover",
    "hopper",
    "hugle",
    "hypatia",
    "jang",
    "jennings",
    "jepsen",
    "joliot",
    "jones",
    "kalam",
    "kare",
    "keller",
    "khorana",
    "kilby",
    "kirch",
    "knuth",
    "kowalevski",
    "lalande",
    "lamarr",
    "lamport",
    "leakey",
    "leavitt",
    "lichterman",
    "liskov",
    "lovelace",
    "lumiere",
    "mahavira",
    "mayer",
    "mccarthy",
    "mcclintock",
    "mclean",
    "mcnulty",
    "meitner",
    "meninsky",
    "mestorf",
    "minsky",
    "mirzakhani",
    "morse",
    "murdock",
    "newton",
    "nobel",
    "noether",
    "northcutt",
    "noyce",
    "panini",
    "pare",
    "pasteur",
    "payne",
    "perlman",
    "pike",
    "poincare",
    "poitras",
    "ptolemy",
    "raman",
    "ramanujan",
    "ride",
    "montalcini",
    "ritchie",
    "roentgen",
    "rosalind",
    "saha",
    "sammet",
    "shaw",
    "shirley",
    "shockley",
    "sinoussi",
    "snyder",
    "spence",
    "stallman",
    "stonebraker",
    "swanson",
    "swartz",
    "swirles",
    "tesla",
    "thompson",
    "torvalds",
    "turing",
    "varahamihira",
    "visvesvaraya",
    "volhard",
    "wescoff",
    "williams",
    "wilson",
    "wing",
    "wozniak",
    "wright",
    "yalow",
    "yonath",
];
var _ = require('lodash');
function getName() {
    return _.sample(left, 1) + "_" + _.sample(right, 1);
}
;
var Config = (function () {
    function Config() {
    }
    return Config;
}());
var Ram = (function () {
    function Ram(room, page) {
        this.room = room;
        this.page = page;
        if (!Game.flags["RAM"]) {
            console.log("Please create a 'RAM' flag.");
        }
    }
    Ram.prototype.Get = function (name) {
        return Game.flags["RAM"].memory[this.room + "." + this.page + "." + name];
    };
    Ram.prototype.Set = function (name, obj) {
        Game.flags["RAM"].memory[this.room + "." + this.page + "." + name] = obj;
    };
    Ram.prototype.Delete = function (name) {
        delete Game.flags["RAM"].memory[this.room + "." + this.page + "." + name];
    };
    return Ram;
}());
var PublicNetwork = (function () {
    function PublicNetwork() {
        this.publicpage = new Ram("_public", "network");
    }
    PublicNetwork.prototype.Set = function (name, obj) {
        this.publicpage.Set(name, obj);
    };
    PublicNetwork.prototype.CreateLaborer = function (employer) {
        this.publicpage.Get("CreateLaborerQueue").push(employer);
    };
    PublicNetwork.prototype.ProvideCreepWithBestSource = function (employer) {
        this.publicpage.Get("ProvideSourceQueue").push(employer);
    };
    return PublicNetwork;
}());
var Department = (function () {
    function Department(room) {
        this.room = room;
        this.publicpage = new Ram("_public", "network");
        this.PublicNetwork = new PublicNetwork();
        this.StructurePage = new StructurePage();
    }
    Department.prototype.Init = function () { };
    Department.prototype.Tick = function () {
        this.Init();
        this.GC();
        this.Logic();
    };
    Department.prototype.Logic = function () { };
    Department.prototype.GC = function () { };
    return Department;
}());
var DepartmentOfResources = (function (_super) {
    __extends(DepartmentOfResources, _super);
    function DepartmentOfResources() {
        return _super.apply(this, arguments) || this;
    }
    DepartmentOfResources.prototype.Init = function () {
        if (!this.ram) {
            this.ram = new Ram(this.room, "DepartmentOfResources");
        }
        if (!this.ram.Get("init")) {
            this.ram.Set("init", true);
            this.ram.Set("active", false);
            this.ram.Set("pasive", false);
            this.publicpage.Set("ProvideSourceQueue", []);
        }
    };
    DepartmentOfResources.prototype.ProvideCreepWithSource = function (name) {
        if (this.ram.Get("pasive")) {
        }
        Game.creeps[name].memory.Source = this.getBestSourceBlock().id;
        if (this.StructurePage.GetProp(Game.creeps[name].memory.Source, "BufferID")) {
            console.log("Found active provider");
            Game.creeps[name].memory.ActiveProvider = this.StructurePage.GetProp(Game.creeps[name].memory.Source, "BufferID");
        }
    };
    DepartmentOfResources.prototype.getBestSourceBlock = function () {
        var re;
        var c = 255;
        var targets = Game.rooms[this.room].find(FIND_SOURCES);
        for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
            var targ = targets_1[_i];
            var myc = 0;
            for (var cr in Game.creeps) {
                var creep = Game.creeps[cr];
                if (creep.room.name == this.room) {
                    if (creep.memory.Source == targ.id) {
                        myc++;
                    }
                }
            }
            if (myc < c) {
                re = targ;
                c = myc;
            }
        }
        return re;
    };
    DepartmentOfResources.prototype.Logic = function () {
        this.Depo();
        var queue = this.publicpage.Get("ProvideSourceQueue");
        for (var _i = 0, queue_1 = queue; _i < queue_1.length; _i++) {
            var i = queue_1[_i];
            this.ProvideCreepWithSource(i);
            var index = queue.indexOf(i);
            if (index > -1) {
                queue.splice(index, 1);
            }
            return;
        }
    };
    DepartmentOfResources.prototype.Depo = function () {
    };
    DepartmentOfResources.prototype.GC = function () {
    };
    return DepartmentOfResources;
}(Department));
var DeparmentOfLabor = (function (_super) {
    __extends(DeparmentOfLabor, _super);
    function DeparmentOfLabor() {
        return _super.apply(this, arguments) || this;
    }
    DeparmentOfLabor.prototype.Init = function () {
        if (!this.ram) {
            this.ram = new Ram(this.room, "DepartmentOfLabor");
        }
        if (!this.ram.Get("init")) {
            this.ram.Set("init", true);
            this.ram.Set("totalcreeps", 0);
            this.publicpage.Set("CreateLaborerQueue", []);
        }
    };
    DeparmentOfLabor.prototype.CreateLaborer = function (employer) {
        var body = [WORK, CARRY, MOVE];
        var Name = getName();
        Game.spawns["Spawn1"].createCreep(body, Name, {
            Employer: employer, UID: String(Math.random()),
            Source: "",
            Bord: false,
            Mine: "",
            ActiveProvider: ""
        });
        this.ram.Set("totalcreeps", this.ram.Get("totalcreeps") + 1);
        return Name;
    };
    DeparmentOfLabor.prototype.Logic = function () {
        var queue = this.publicpage.Get("CreateLaborerQueue");
        for (var _i = 0, queue_2 = queue; _i < queue_2.length; _i++) {
            var i = queue_2[_i];
            this.CreateLaborer(i);
            var index = queue.indexOf(i);
            if (index > -1) {
                queue.splice(index, 1);
            }
            return;
        }
    };
    DeparmentOfLabor.prototype.GC = function () {
        for (var m in Memory.creeps) {
            if (!(m in Game.creeps)) {
                delete Memory.creeps[m];
            }
        }
    };
    return DeparmentOfLabor;
}(Department));
var DepartmentOfBuilding = (function (_super) {
    __extends(DepartmentOfBuilding, _super);
    function DepartmentOfBuilding() {
        var _this = _super.apply(this, arguments) || this;
        _this.MIN_BUILDERS = 5;
        _this.MAX_BUILDERS = 10;
        return _this;
    }
    DepartmentOfBuilding.prototype.Init = function () {
        if (!this.ram) {
            this.ram = new Ram(this.room, "DepartmentOfBuilding");
        }
        if (!this.ram.Get("init")) {
            this.ram.Set("init", true);
            var targets = Game.rooms[this.room].find(FIND_SOURCES);
            for (var _i = 0, targets_2 = targets; _i < targets_2.length; _i++) {
                var target = targets_2[_i];
                this.ram.Set(target.id, "");
            }
        }
    };
    DepartmentOfBuilding.prototype.Logic = function () {
        this.LogicBuilders();
        this.LogicBuffers();
    };
    DepartmentOfBuilding.prototype.LogicBuilders = function () {
        var buildersCount = this.GetBuildersCount();
        if (buildersCount < this.MIN_BUILDERS) {
            this.PublicNetwork.CreateLaborer("Builder");
        }
        for (var i in Game.creeps) {
            var creep = Game.creeps[i];
            if (creep.memory.Employer == "Builder") {
                if (creep.memory.Source == "") {
                    this.PublicNetwork.ProvideCreepWithBestSource(creep.name);
                }
            }
        }
    };
    DepartmentOfBuilding.prototype.GetBuildersCount = function () {
        var re = 0;
        for (var i in Game.creeps) {
            var creep = Game.creeps[i];
            if (creep.memory.Employer == "Builder") {
                re++;
            }
        }
        return re;
    };
    DepartmentOfBuilding.prototype.LogicBuffers = function () {
        var FindIndex = [FIND_SOURCES, FIND_MY_SPAWNS];
        for (var _i = 0, FindIndex_1 = FindIndex; _i < FindIndex_1.length; _i++) {
            var find = FindIndex_1[_i];
            var targets = Game.rooms[this.room].find(find, {
                filter: function (structure) {
                    if (_.has(structure, 'structureType')) {
                        var struct = structure;
                        if (struct.structureType == STRUCTURE_CONTROLLER) {
                            return true;
                        }
                        return false;
                    }
                    return true;
                }
            });
            for (var _a = 0, targets_3 = targets; _a < targets_3.length; _a++) {
                var target = targets_3[_a];
                if (!this.ram.Get(target.id)) {
                    this.ram.Set(target.id, "");
                }
                var t = this.ram.Get(target.id).split('_');
                if (t[0] == "BUILDING") {
                    var id = this.findBufferAtSpot(Number(t[1]), Number(t[2]));
                    if (id) {
                        this.ram.Set(target.id, id);
                        var dpram = new Ram(this.room, "DepartmentOfResources");
                        dpram.Set("active", false);
                        this.StructurePage.WriteProp(target.id, "hasBuffer", true);
                        this.StructurePage.WriteProp(target.id, "BufferID", id);
                    }
                }
                else {
                    if (!this.BufferExsists(this.ram.Get(target.id))) {
                        var pos = this.findOpenSpot(target.pos);
                        var room = Game.rooms[this.room];
                        this.ram.Set(target.id, "BUILDING_" + pos.x + "_" + pos.y);
                        Game.rooms[this.room].createConstructionSite(pos, STRUCTURE_CONTAINER);
                    }
                }
            }
        }
    };
    DepartmentOfBuilding.prototype.findBufferAtSpot = function (x, y) {
        var room = Game.rooms[this.room];
        var objs = room.lookAt(x, y);
        for (var _i = 0, objs_1 = objs; _i < objs_1.length; _i++) {
            var i = objs_1[_i];
            if (i.structure) {
                if (i.structure.structureType = STRUCTURE_CONTAINER) {
                    return i.structure.id;
                }
            }
        }
    };
    DepartmentOfBuilding.prototype.findOpenSpot = function (pos) {
        var offset = 1;
        var x = pos.x;
        var y = pos.y;
        var room = Game.rooms[this.room];
        var cheackPos = room.getPositionAt(x + 1 + offset, y);
        var item = room.lookAt(cheackPos)[0];
        if (!item.constructionSite && !item.source && !item.structure && item.terrain == "plain") {
            return cheackPos;
        }
        cheackPos = room.getPositionAt(x - 1 - offset, y);
        var item = room.lookAt(cheackPos)[0];
        if (!item.constructionSite && !item.source && !item.structure && item.terrain == "plain") {
            return cheackPos;
        }
        cheackPos = room.getPositionAt(y + 1 + offset, y);
        var item = room.lookAt(cheackPos)[0];
        if (!item.constructionSite && !item.source && !item.structure && item.terrain == "plain") {
            return cheackPos;
        }
        cheackPos = room.getPositionAt(y - 1 - offset, y);
        var item = room.lookAt(cheackPos)[0];
        if (!item.constructionSite && !item.source && !item.structure && item.terrain == "plain") {
            return cheackPos;
        }
    };
    DepartmentOfBuilding.prototype.BufferExsists = function (id) {
        var targets = Game.rooms[this.room].find(FIND_STRUCTURES, {
            filter: function (structure) {
                var stru = structure;
                return stru.id == id;
            }
        });
        return targets.length == 1;
    };
    DepartmentOfBuilding.prototype.GC = function () {
    };
    return DepartmentOfBuilding;
}(Department));
var DepartmentOfMining = (function (_super) {
    __extends(DepartmentOfMining, _super);
    function DepartmentOfMining() {
        return _super.apply(this, arguments) || this;
    }
    DepartmentOfMining.prototype.Init = function () {
        if (!this.ram) {
            this.ram = new Ram(this.room, "DepartmentOfMining");
        }
        if (!this.ram.Get("init")) {
            this.ram.Set("init", true);
        }
    };
    DepartmentOfMining.prototype.Logic = function () {
        var FindIndex = [FIND_SOURCES];
        for (var _i = 0, FindIndex_2 = FindIndex; _i < FindIndex_2.length; _i++) {
            var find = FindIndex_2[_i];
            var targets = Game.rooms[this.room].find(find);
            for (var _a = 0, targets_4 = targets; _a < targets_4.length; _a++) {
                var target = targets_4[_a];
                var ready = this.StructurePage.GetProp(target.id, "hasBuffer");
                if (ready) {
                    if (!this.hasMiner(target.id)) {
                        console.log("i am ready");
                        var miner = Game.creeps[this.getMiner()];
                        if (miner) {
                            miner.memory.Mine = target.id;
                            miner.memory.Source = target.id;
                        }
                    }
                }
            }
        }
    };
    DepartmentOfMining.prototype.hasMiner = function (id) {
        for (var i in Game.creeps) {
            var creep = Game.creeps[i];
            if (creep.memory.Mine == id) {
                return true;
            }
        }
        return false;
    };
    DepartmentOfMining.prototype.getMiner = function () {
        for (var i in Game.creeps) {
            var creep = Game.creeps[i];
            if (creep.memory.Mine == "" && creep.memory.Employer == "Miner") {
                return i;
            }
        }
        this.PublicNetwork.CreateLaborer("Miner");
        return "";
    };
    DepartmentOfMining.prototype.GC = function () {
    };
    return DepartmentOfMining;
}(Department));
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
var Creeps = (function () {
    function Creeps() {
        this.StructurePage = new StructurePage();
        this.PublicNetwork = new PublicNetwork();
    }
    Creeps.prototype.Tick = function () {
        for (var i in Game.creeps) {
            this.RunCreep(i);
        }
    };
    Creeps.prototype.RunCreep = function (name) {
        var creep = Game.creeps[name];
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
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if (targets.length > 0) {
                        creep.memory.Bord = false;
                        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0]);
                        }
                    }
                    else {
                        creep.memory.Source = "";
                        creep.memory.Bord = true;
                    }
                }
                else {
                    if (creep.memory.ActiveProvider && creep.memory.ActiveProvider == "") {
                        var sources = creep.room.find(FIND_SOURCES, {
                            filter: function (structure) {
                                var stru = structure;
                                return stru.id == creep.memory.Source;
                            }
                        });
                        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources[0]);
                        }
                    }
                    else {
                        var buffers = creep.room.find(FIND_STRUCTURES, {
                            filter: function (structure) {
                                var stru = structure;
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
                    var target = this.GetSourceContainer(creep);
                    if (target) {
                        creep.memory.Bord = false;
                        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }
                    else {
                        creep.memory.Bord = true;
                    }
                }
                else {
                    var sources = creep.room.find(FIND_SOURCES, {
                        filter: function (structure) {
                            var stru = structure;
                            return stru.id == creep.memory.Mine;
                        }
                    });
                    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0]);
                    }
                }
                break;
        }
    };
    Creeps.prototype.GetSourceContainer = function (creep) {
        return Game.getObjectById(this.StructurePage.GetProp(creep.memory.Mine, "BufferID"));
    };
    Creeps.prototype.Bord = function (creep) {
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
            var sources = creep.room.find(FIND_SOURCES, {
                filter: function (structure) {
                    var stru = structure;
                    return stru.id == creep.memory.Source;
                }
            });
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    };
    return Creeps;
}());
var StructurePage = (function () {
    function StructurePage() {
        this.structures = new Ram("_public", "structures");
    }
    StructurePage.prototype.WriteProp = function (struct, name, obj) {
        this.structures.Set(struct + "." + name, obj);
    };
    StructurePage.prototype.GetProp = function (struct, name) {
        return this.structures.Get(struct + "." + name);
    };
    return StructurePage;
}());
var RoomWraper = (function () {
    function RoomWraper(room) {
        this.room = room;
        this.departments = [];
        this.departments.push(new DeparmentOfLabor(room));
        this.departments.push(new DepartmentOfResources(room));
        this.departments.push(new DepartmentOfBuilding(room));
        this.departments.push(new DepartmentOfMining(room));
    }
    RoomWraper.prototype.tick = function () {
        for (var _i = 0, _a = this.departments; _i < _a.length; _i++) {
            var i = _a[_i];
            i.Tick();
        }
    };
    return RoomWraper;
}());
var cfg = new Config();
var rooms = [new RoomWraper(Game.spawns['Spawn1'].room.name)];
function tick() {
    for (var _i = 0, rooms_1 = rooms; _i < rooms_1.length; _i++) {
        var i = rooms_1[_i];
        i.tick();
    }
}
tick();
var creeps = new Creeps();
module.exports.loop = function () {
    tick();
    creeps.Tick();
};
