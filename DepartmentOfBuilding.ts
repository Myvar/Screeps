class DepartmentOfBuilding extends Department {


    Init(): void {
        if (!this.ram) {
            this.ram = new Ram(this.room, "DepartmentOfBuilding");
        }

        if (!this.ram.Get<boolean>("init")) {
            this.ram.Set("init", true);
            var targets = Game.rooms[this.room].find<Source>(FIND_SOURCES);
            for (var target of targets) {
                this.ram.Set(target.id, "");
            }
        }
    }

    //tasks of this Department
    /* 
        make sure there is enuf builders to complete the tasks at hand
        place buffers
    */

    Logic() {
        this.LogicBuilders();
        this.LogicBuffers();
    }

    private MIN_BUILDERS = 5;
    private MAX_BUILDERS = 10;

    LogicBuilders() {
        var buildersCount = this.GetBuildersCount();
        if (buildersCount < this.MIN_BUILDERS) {
            this.PublicNetwork.CreateLaborer("Builder");
        }

        //TODO: add more builders(with in MAX limit), baced on the total structures that need building    

        for (var i in Game.creeps) {
            var creep = Game.creeps[i];
            if (creep.memory.Employer == "Builder") {
                if (creep.memory.Source == "") {
                    this.PublicNetwork.ProvideCreepWithBestSource(creep.name);
                }
            }
        }
    }

    GetBuildersCount() {
        var re = 0;
        for (var i in Game.creeps) {
            var creep = Game.creeps[i];
            if (creep.memory.Employer == "Builder") {
                re++;
            }
        }

        return re;
    }

    LogicBuffers() {
        //sources

        var FindIndex = [FIND_SOURCES, FIND_MY_SPAWNS];

        for (var find of FindIndex) {
            var targets = Game.rooms[this.room].find<Source>(find, {
                filter: (structure: RoomObject) => {
                    if(_.has(structure, 'structureType'))
                    {
                        var struct = structure as Structure;

                        if(struct.structureType == STRUCTURE_CONTROLLER)
                        {
                            return true;
                        }

                        return false;
                    }
                    return true;
                }
            });
            for (var target of targets) {
                if (!this.ram.Get<string>(target.id)) {
                    this.ram.Set(target.id, "");
                }

                var t = this.ram.Get<string>(target.id).split('_');
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
                    if (!this.BufferExsists(this.ram.Get<string>(target.id))) {
                        var pos = this.findOpenSpot(target.pos);
                        var room = Game.rooms[this.room];
                        this.ram.Set(target.id, "BUILDING_" + pos.x + "_" + pos.y);
                        Game.rooms[this.room].createConstructionSite(pos, STRUCTURE_CONTAINER);


                    }
                }
            }
        }



    }

    findBufferAtSpot(x: number, y: number): string {
        var room = Game.rooms[this.room];
        var objs = room.lookAt(x, y);
        for (var i of objs) {
            if (i.structure) {
                if (i.structure.structureType = STRUCTURE_CONTAINER) {
                    return i.structure.id;
                }
            }
        }
    }

    findOpenSpot(pos: RoomPosition): RoomPosition {
        var offset = 1; //basicly dont build agains the source build one block away

        var x = pos.x;
        var y = pos.y;

        var room = Game.rooms[this.room];

        //for now just cheack up, down, left and right
        var cheackPos: RoomPosition = room.getPositionAt(x + 1 + offset, y); // right       

        var item = room.lookAt(cheackPos)[0];
        if (!item.constructionSite && !item.source && !item.structure && item.terrain == "plain") {
            return cheackPos;
        }

        cheackPos = room.getPositionAt(x - 1 - offset, y); // left


        var item = room.lookAt(cheackPos)[0];
        if (!item.constructionSite && !item.source && !item.structure && item.terrain == "plain") {
            return cheackPos;
        }


        cheackPos = room.getPositionAt(y + 1 + offset, y); // bottom


        var item = room.lookAt(cheackPos)[0];
        if (!item.constructionSite && !item.source && !item.structure && item.terrain == "plain") {
            return cheackPos;
        }
        cheackPos = room.getPositionAt(y - 1 - offset, y); // top


        var item = room.lookAt(cheackPos)[0];
        if (!item.constructionSite && !item.source && !item.structure && item.terrain == "plain") {
            return cheackPos;
        }
    }

    BufferExsists(id: string): boolean {
        var targets = Game.rooms[this.room].find<RoomObject>(FIND_STRUCTURES, {
            filter: (structure: RoomObject) => {
                var stru: Container = structure as Container;

                return stru.id == id;
            }
        });
        return targets.length == 1;
    }

    GC(): void {

    }
}