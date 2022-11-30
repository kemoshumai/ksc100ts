import llvm from "llvm-bindings";
import crypto from 'crypto';

export class KSCBuilder{
    context: llvm.LLVMContext;
    builder: llvm.IRBuilder;
    module: llvm.Module;
    uniqueHash: string;
    
    constructor(context: llvm.LLVMContext, builder: llvm.IRBuilder, module: llvm.Module)
    {
        const sha256 = crypto.createHash('sha256');
        sha256.update(Math.random().toString(10));

        this.context = context;
        this.builder = builder;
        this.module = module;
        this.uniqueHash = sha256.digest('hex');
    }

    CreateEntryFunction(): llvm.BasicBlock
    {
        const {builder,context,module} = this;

        const returnType = builder.getInt32Ty();
        const functionType = llvm.FunctionType.get(returnType, [], false);
        const func = llvm.Function.Create(functionType, llvm.Function.LinkageTypes.ExternalLinkage, this.makeManglingName("main"), module);

        const entryBB = llvm.BasicBlock.Create(context, 'entry', func);
        builder.SetInsertPoint(entryBB);

        if (llvm.verifyFunction(func)) {
            console.error('\u001b[31mVerifying function failed\u001b[0m');
        }
        if (llvm.verifyModule(module)) {
            console.error('\u001b[31mVerifying module failed\u001b[0m');
        }

        return entryBB;
    }

    SetCurrentBlock(block: llvm.BasicBlock)
    {
        this.builder.SetInsertPoint(block);
    }

    CreateReturn()
    {
        this.builder.CreateRet(this.builder.getInt32(0));
    }

    Print(): string
    {
        return this.module.print();
    }


    private makeManglingName(basename: string)
    {
        return `?${basename}@${this.module.getName()}<${this.uniqueHash}>`;
    }


}