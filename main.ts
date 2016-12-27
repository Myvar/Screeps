declare var module: any;

var servies = new Ticker();

//tests
/*
servies.addService(new Service(function() { console.log("test") }));

var srv2 = new Service(function() { console.log("test1") });
srv2.ExecutionRule = ServiceExecutionRule.Event;
srv2.eventName = "botDied";
servies.addService(srv2);

servies.fireEvent("botDied");
*/

//cfg
var cfg : Config = new Config();

//factorys
var creepFact : CreepFactory = new CreepFactory(cfg);

//servies
servies.addService(new Service(function() { creepFact.Tick(); }));

module.exports.loop = function () {
    servies.tick();
}
