class Config {
    public creepConfig: CreepDef[] =
    [
        { //always have 5 workers at a time
            Name: "Worker",
            CreepBody: [WORK, CARRY, MOVE],
            Min: 5,
            Max: 5
        }
    ];

    public MainSpawn : string = "Spawn1";
}