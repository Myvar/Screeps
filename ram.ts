class Ram
{
    constructor(private room : string, private page : string)
    {
        if(!Game.flags["RAM"])
        {        
            console.log("Please create a 'RAM' flag.");
        } 
    }

    Get<T>(name : string) : T
    {
        return Game.flags["RAM"].memory[this.room + "." + this.page + "." +  name] as T;
    }

    Set(name : string, obj : any)
    {
        Game.flags["RAM"].memory[this.room + "." + this.page + "." + name] = obj;
    }

    Delete(name : string) : void
    {
        delete Game.flags["RAM"].memory[this.room + "." + this.page + "." + name];
    }

}