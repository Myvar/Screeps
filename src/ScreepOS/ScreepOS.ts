import p = require("./program");

export default class ScreepOS
{

    private programs : p.Program[] = [];

    constructor()
    {
               
    }

    Import(program : p.Program)
    {
        this.programs.push(program);
    }

    Loop()
    {
        for(var pro of this.programs)
        {
            pro.Execute();
        }
    }
}

module.exports = ScreepOS;