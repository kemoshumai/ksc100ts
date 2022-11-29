import {Compiler} from './Compiler';

function main(): void {
    const compiler = new Compiler("testmodule");
    const ir = compiler.compile();
    console.log("====== LLVM IR ======")
    console.log(ir);
}

main();