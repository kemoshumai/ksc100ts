import llvm from "llvm-bindings";

export class KSCBuilder{
    context: llvm.LLVMContext;
    builder: llvm.IRBuilder;
    module: llvm.Module;
    
    constructor(context: llvm.LLVMContext, builder: llvm.IRBuilder, module: llvm.Module)
    {
        this.context = context;
        this.builder = builder;
        this.module = module;
    }

    create_entry_function()
    {
        const {builder,context,module} = this;

        const returnType = builder.getInt32Ty();
        const functionType = llvm.FunctionType.get(returnType, [], false);
        const func = llvm.Function.Create(functionType, llvm.Function.LinkageTypes.ExternalLinkage, 'main', module);

        const entryBB = llvm.BasicBlock.Create(context, 'entry', func);
        builder.SetInsertPoint(entryBB);

        if (llvm.verifyFunction(func)) {
            console.error('\u001b[31mVerifying function failed\u001b[0m');
        }
        if (llvm.verifyModule(module)) {
            console.error('\u001b[31mVerifying module failed\u001b[0m');
        }
    }

    create_return()
    {
        this.builder.CreateRet(this.builder.getInt32(0));
    }

    print(): string
    {
        return this.module.print();
    }


}