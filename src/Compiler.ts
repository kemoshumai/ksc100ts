import llvm from 'llvm-bindings';

export class Compiler
{
    context: llvm.LLVMContext;
    builder: llvm.IRBuilder;

    constructor()
    {
        const context = new llvm.LLVMContext();
        const builder = new llvm.IRBuilder(context);
        this.context = context;
        this.builder = builder;
    }

    compile(modulename: string)
    {
        const module = new llvm.Module(modulename, this.context);
    }
}