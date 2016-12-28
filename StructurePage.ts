class StructurePage
{
    public structures: Ram = new Ram("_public", "structures");

    WriteProp(struct : string, name : string, obj : any)
    {
        this.structures.Set(struct + "." + name, obj);
    }

    GetProp<T> (struct : string, name : string) : T
    {
        return this.structures.Get<T>(struct + "." + name);
    }
}