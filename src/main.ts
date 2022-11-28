import {Compiler} from './Compiler';

function main(): void {
    const compiler = new Compiler();
    compiler.compile("testmodule");
}

main();