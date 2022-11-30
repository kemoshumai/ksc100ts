import llvm from 'llvm-bindings';
import { ExpressionNode, ProgramNode } from './ASTs';
import { KSCBuilder } from './KSCBuilder';
import { logger } from './logger';

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

        // file実行時に呼ばれる関数を作る。
        const entryBlock = builder.CreateEntryFunction();

        // コンパイル処理
        for(const expression of  program.expressions)
        {
            this.compileExpression(expression);
        }

        // 最初の関数に処理を戻す。
        builder.SetCurrentBlock(entryBlock);
        builder.CreateReturn();

        // IRを文字列として返す
        return builder.Print();
    }
    
    compileExpression(expression: ExpressionNode)
    {
        switch(expression.type)
        {
            default:
                logger.error(`Expression '${expression.type}' is not implemented so far.`)
        }
    }
}