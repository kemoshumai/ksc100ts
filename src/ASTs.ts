// ここでASTとはただの文字列であるソースコードを、意味を持った文字列のまとまりを作って関係性を入れ子にしたものです。
// つまりソースコードの構造体表記みたいな感じです。
// その一つ一つのまとまりをNodeといい、それぞれ命令として意味を持ちます。
// Nodeの中にはその命令が正しく存在するのに必要なソースコード上の記述が、意味づけられて配置されています。

// フロー
// [ソースコード] --構文解析--> [AST] --意味解析--> [IR]
//                              ↑ここ

export enum KSCNodes{
    FunctionNode,
    VariableDeclaration
}

export type ExpressionNode = FunctionNode | VariableDeclaration;


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
export interface VariableDeclaration{
    type: KSCNodes,
    vartype: string,
    name: string,
    mutable: boolean,

    // 初期値(nullでデフォルト値)
    value: ExpressionNode | null
}

/// 

