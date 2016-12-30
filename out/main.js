var IScreepOS = require("ScreepOS");
var IMinimalProgram = require("minimalProgram");
var screepOS = new IScreepOS();
var mainRoom = new IMinimalProgram(Game.spawns["Spawn1"].room.name);
screepOS.Import(mainRoom);
module.exports.loop = screepOS.Loop();
