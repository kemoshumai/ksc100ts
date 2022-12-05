import {Compiler} from './Compiler';
import {BinaryOperatorEnum, ProgramNode} from './ASTs';

function main(): void {

    //テストコード(最大公約数を求めるKSCプログラム)
    const program: ProgramNode = {
        expressions: [
            {
                type: "VariableDeclarationNode",
                vartype: "Number",
                name: "hoge",
                mutable: false,
                value: {
                    type: "ConstantNumberLiteralExpression",
                    value: 123
                }
            }
        ]
    };

    const compiler = new Compiler("testmodule");
    const ir = compiler.compile(program);
    console.log("====== LLVM IR ======")
    console.log(ir);
}

main();