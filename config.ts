class Config {
    public creepConfig: CreepDef[] =
    [
        { //always have 5 workers at a time
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
        }
        ,
        {
            Name: "repear",
            CreepBody: [WORK, CARRY, MOVE],
            Min: 1,
            Max: 1
        }
    ];

    public MainSpawn: string = "Spawn1";
}