class Department {

    public ram: Ram;
    public publicpage: Ram = new Ram("_public", "network");
    public PublicNetwork: PublicNetwork = new PublicNetwork();
    public StructurePage: StructurePage = new StructurePage();

    constructor(public room: string) {

    }

    Init(): void { }
    Tick(): void {
        this.Init();
        this.GC();
        this.Logic();
    }
    Logic() { }
    GC(): void { }
}