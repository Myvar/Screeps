class PublicNetwork
{
    private publicpage: Ram = new Ram("_public", "network");

    Set(name : string, obj : any)
    {
        this.publicpage.Set(name, obj);
    }

    CreateLaborer(employer: string) {
        this.publicpage.Get<string[]>("CreateLaborerQueue").push(employer);
    }

     ProvideCreepWithBestSource(employer: string) {
        this.publicpage.Get<string[]>("ProvideSourceQueue").push(employer);
    }
    
}