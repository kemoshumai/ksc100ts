import {Compiler} from './Compiler';
import {BinaryOperatorEnum, FunctionNode, KSCNodes, ProgramNode} from './ASTs';

function main(): void {

    //テストコード(最大公約数を求めるKSCプログラム)
    const program: ProgramNode = {
        expressions: [
            {
                type: KSCNodes.VariableDeclarationNode,
                vartype: "Function",
                name: "gcd",
                mutable: false,
                value: {
                    type: KSCNodes.FunctionNode,
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
                            type: KSCNodes.ReturnNode,
                            value: {
                                type: KSCNodes.IfExpressionNode,
                                condition: {
                                    type: KSCNodes.BinaryOperatorNode,
                                    op: BinaryOperatorEnum.EQUAL,
                                    left: {
                                        type: KSCNodes.ExpressionRefNode,
                                        identifier: "b"
                                    },
                                    right: {
                                        type: KSCNodes.ConstantNumberLiteralExpression,
                                        value: 0
                                    }
                                },
                                then: {
                                    type: KSCNodes.ExpressionRefNode,
                                    identifier: "a"
                                },
                                else: {
                                    type: KSCNodes.FunctionCallNode,
                                    target: "gcd",
                                    arguments: [
                                        {
                                            type: KSCNodes.ExpressionRefNode,
                                            identifier: "b"
                                        },
                                        {
                                            type: KSCNodes.BinaryOperatorNode,
                                            op: BinaryOperatorEnum.MOD,
                                            left: {
                                                type: KSCNodes.ExpressionRefNode,
                                                identifier: "a"
                                            },
                                            right: {
                                                type: KSCNodes.ExpressionRefNode,
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