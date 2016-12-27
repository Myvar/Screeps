class Factory
{
    static GlobalUnitCount : number = 0;

    constructor(public cfg : Config)
    {

    }

    CreateUnit(name: string, params : any[])
    {
        console.log("Generic Factory Creating Unit");
    }

    CollectGarbage()
    {
        console.log("Generic Factory Collecting Garbage");
    }

    FactoryLogic()
    {
        console.log("Generic Factory Logic");
    }

    Tick()
    {
        this.CollectGarbage();
        this.FactoryLogic();
    }
}