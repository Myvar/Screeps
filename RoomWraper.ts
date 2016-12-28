class RoomWraper
{
    public departments : Department[] = [];

    constructor(public room : string)
    {
        this.departments.push(new DeparmentOfLabor(room));
        this.departments.push(new DepartmentOfResources(room));
        this.departments.push(new DepartmentOfBuilding(room));
        this.departments.push(new DepartmentOfMining(room));
    }

    tick() : void
    {
        for(var i of this.departments)
        {
            i.Tick();
        }
    }
}