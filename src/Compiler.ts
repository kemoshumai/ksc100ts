import llvm from 'llvm-bindings';
import { ExpressionNode, ProgramNode } from './ASTs';
import { KSCBuilder } from './KSCBuilder';
import { KSCStack } from './KSCStack';
import { KSCValue, VoidValue } from './KSCValue';
import { logger } from './logger';

export class Compiler
{
    builder: KSCBuilder;
    stack: KSCStack;

    constructor(modulename: string)
    {
        const context = new llvm.LLVMContext();
        const builder = new llvm.IRBuilder(context);
        const module = new llvm.Module(modulename, context);
        this.builder = new KSCBuilder(context, builder, module);
        this.stack = new KSCStack();
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
    
    compileExpression(expression: ExpressionNode) : KSCValue
    {
        switch(expression.type)
        {
            case 'VariableDeclarationNode':
                const {vartype, name, mutable, value} = expression;
                const executedValue = value ? this.compileExpression(value) : this.stack.getKSCValueFromTypeName(vartype,this.builder.context);
                if (this.stack.getTypeFromLiteralTypeExpression(vartype) != executedValue.type)
                {
                    // もし代入元と代入先で型が違ったら
                    throw Error(`型${vartype}が期待されましたが${executedValue.type}が代入されようとしています。`);
                }
                this.stack.insertVariableIntoCurrentScope(name, executedValue, mutable);
                return executedValue.copy(this.builder);
            default:
                logger.error(`Expression '${expression.type}' is not implemented so far.`)
                break;
        }
        return new VoidValue();
    }
}