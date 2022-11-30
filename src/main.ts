import {Compiler} from './Compiler';
import {BinaryOperatorEnum, ProgramNode} from './ASTs';

function main(): void {

    //テストコード(最大公約数を求めるKSCプログラム)
    const program: ProgramNode = {
        expressions: [
            {
                type: "VariableDeclarationNode",
                vartype: "Function",
                name: "gcd",
                mutable: false,
                value: {
                    type: "FunctionNode",
                    returnType: "Number",
                    paramTypes: [
                        {
                            name: "a",
                            type: "Number"
                        },
                        {
                            name: "b",
                            type: "Number"
                        }
                    ],
                    content: [
                        {
                            type: "ReturnNode",
                            value: {
                                type: "IfExpressionNode",
                                condition: {
                                    type: "BinaryOperatorNode",
                                    op: BinaryOperatorEnum.EQUAL,
                                    left: {
                                        type: "ExpressionRefNode",
                                        identifier: "b"
                                    },
                                    right: {
                                        type: "ConstantNumberLiteralExpression",
                                        value: 0
                                    }
                                },
                                then: {
                                    type: "ExpressionRefNode",
                                    identifier: "a"
                                },
                                else: {
                                    type: "FunctionCallNode",
                                    target: "gcd",
                                    arguments: [
                                        {
                                            type: "ExpressionRefNode",
                                            identifier: "b"
                                        },
                                        {
                                            type: "BinaryOperatorNode",
                                            op: BinaryOperatorEnum.MOD,
                                            left: {
                                                type: "ExpressionRefNode",
                                                identifier: "a"
                                            },
                                            right: {
                                                type: "ExpressionRefNode",
                                                identifier: "b"
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ]
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