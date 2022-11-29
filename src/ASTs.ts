// ここでASTとはただの文字列であるソースコードを、意味を持った文字列のまとまりを作って関係性を入れ子にしたものです。
// つまりソースコードの構造体表記みたいな感じです。
// その一つ一つのまとまりをNodeといい、それぞれ命令として意味を持ちます。
// Nodeの中にはその命令が正しく存在するのに必要なソースコード上の記述が、意味づけられて配置されています。

// フロー
// [ソースコード] --構文解析--> [AST] --意味解析--> [IR]
//                              ↑ここ

export enum KSCNodes{
    FunctionNode,
    VariableDeclarationNode,
    ReturnNode,
    IfExpressionNode,
    ExpressionRefNode,
    FunctionCallNode,
    BinaryOperatorNode,
    ConstantNumberLiteralExpression
}

export type ExpressionNode = FunctionNode | VariableDeclarationNode | ReturnNode | IfExpressionNode | ExpressionRefNode | FunctionCallNode | BinaryOperatorNode | ConstantNumberLiteralExpression;


export interface ProgramNode{
    expressions: ExpressionNode[]
}

/// 無名関数リテラル
export interface FunctionNode{
    type: KSCNodes,

    // 返り値の型
    returnType: string,

    // 引数(複数)
    paramTypes: { name: string, type: string }[],

    // 関数の中身
    content: ExpressionNode[]

}

/// 変数(定数)宣言
export interface VariableDeclarationNode{
    type: KSCNodes,
    vartype: string,
    name: string,
    mutable: boolean,

    // 初期値(nullでデフォルト値)
    value: ExpressionNode | null
}

/// return
export interface ReturnNode{
    type: KSCNodes,
    value: ExpressionNode
}

/// if式
export interface  IfExpressionNode{
    type: KSCNodes,
    condition: ExpressionNode,
    then: ExpressionNode,
    else: ExpressionNode
}

/// 値読み出し
export interface ExpressionRefNode{
    type: KSCNodes,
    identifier: string
}


/// 関数呼び出し
export interface FunctionCallNode{
    type:KSCNodes,
    target: string,
    arguments: ExpressionNode[]
}

/// 二項演算子
export interface BinaryOperatorNode{
    type: KSCNodes,
    op: BinaryOperatorEnum,
    left: ExpressionNode,
    right: ExpressionNode
}


/// 数値リテラル
export interface ConstantNumberLiteralExpression{
    type: KSCNodes,
    value: number
}

export enum BinaryOperatorEnum{
    ADD,
    SUB,
    MUL,
    DIV,
    DIV_INT,
    MOD,
    EQUAL,
    NOT_EQUAL,
    GREATER_THAN,
    GREATER_THAN_OR_EQUAL,
    LESS_THAN,
    LESS_THAN_OR_EQUAL
}