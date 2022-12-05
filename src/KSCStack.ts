import llvm from "llvm-bindings";
import { BooleanValue, KSCValue, NumberValue, VoidValue } from "./KSCValue";

interface Variable{
    name: string,
    value: KSCValue
}

interface Scope{
    name: string,
    variables:  Variable[]
}

export class KSCStack
{
    stack: Scope[];

    constructor()
    {
        this.stack = [{name:"toplevel", variables: []}];
    }

    insertVariableIntoCurrentScope(name: string, value: KSCValue)
    {
        this.stack.at(-1)?.variables.push({name,value})
    }

    makeNewScope(scopename: string)
    {
        this.stack.push({name: scopename, variables:[]});
    }

    popCurrentScope()
    {
        this.stack.pop();
    }

    searchVariableByName(name: string): Variable | null
    {
        for(const scope of this.stack)
        {
            const found = scope.variables.find( v => v.name == name);
            if (found != undefined) return found;
        }
        return null;
    }

    getTypeFromLiteralTypeExpression(typename: string)
    {
        switch(typename)
        {
            //プリミティブ型
            case "Number":
            case "Bool":
            case "Void":
                return typename;
            default:
                //TODO: ユーザー定義型
                throw Error("プリミティブ型以外を解決しようとしました。");
        }
    }

    getKSCValueFromTypeName(typename: string, context: llvm.LLVMContext): KSCValue
    {
        switch(typename)
        {
            case "Number":
                return new NumberValue(context);
            case "Bool":
                return new BooleanValue(context);
            case "Void":
                return new VoidValue();
            default:
                throw Error("その型を値にできないか、実装されていません。");
        }
    }
}