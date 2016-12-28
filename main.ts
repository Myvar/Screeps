declare var module: any;


//cfg
var cfg : Config = new Config();

//Rooms
var rooms : RoomWraper[] = [new RoomWraper(Game.spawns['Spawn1'].room.name)];

function tick()
{
    for(var i of rooms)
    {
        i.tick();
    }
}

//init all
tick();

//creeps controler
var creeps : Creeps = new Creeps();

module.exports.loop = function () {
    tick();
    creeps.Tick();
}
