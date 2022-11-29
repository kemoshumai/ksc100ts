import llvm from 'llvm-bindings';
import { ProgramNode } from './ASTs';
import { KSCBuilder } from './KSCBuilder';

export class Compiler
{
    builder: KSCBuilder;

    constructor(modulename: string)
    {
        const context = new llvm.LLVMContext();
        const builder = new llvm.IRBuilder(context);
        const module = new llvm.Module(modulename, context);
        this.builder = new KSCBuilder(context, builder, module);
    }

    compile(program: ProgramNode): string
    {
        const { builder } = this;
        builder.CreateEntryFunction();
        builder.CreateReturn();
        return builder.Print();
    }
}