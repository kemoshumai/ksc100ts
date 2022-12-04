import llvm from "llvm-bindings";
import { logger } from "./logger";

export type KSCValue = NumberValue | BooleanValue;

/// 数値型
export class NumberValue{
    type: "Number" = "Number";
    ref: llvm.Value;
    constructor(context: llvm.LLVMContext)
    {
        this.ref = llvm.ConstantFP.get(llvm.Type.getDoubleTy(context), 0);
    }

    validate(context: llvm.LLVMContext, value: llvm.Value): boolean
    {
        if(value.getType().isDoubleTy() == false)
        {
            logger.trace("Expected type id:" + llvm.Type.getDoubleTy(context).getTypeID());
            logger.trace("Type id:" + value.getType().getTypeID());
            return false;
        }
        return true;
    }

    get(): llvm.Value
    {
        return this.ref;
    }

    set(context: llvm.LLVMContext, value: llvm.Value): boolean
    {
        if(this.validate(context, value) == false)
            return false;
        this.ref = value;
        return true;
    }
}

// 真偽値型
export class BooleanValue{
    type: "Bool" = "Bool";
    ref: llvm.Value;
    constructor(context: llvm.LLVMContext)
    {
        this.ref = llvm.ConstantFP.get(llvm.Type.getInt1Ty(context), 0);
    }

    validate(context: llvm.LLVMContext, value: llvm.Value): boolean
    {
        if(value.getType().isIntegerTy() == false)
        {
            logger.trace("Expected type id:" + llvm.Type.getInt1Ty(context).getTypeID());
            logger.trace("Type id:" + value.getType().getTypeID());
            return false;
        }
        return true;
    }

    get(): llvm.Value
    {
        return this.ref;
    }

    set(context: llvm.LLVMContext, value: llvm.Value): boolean
    {
        if(this.validate(context, value) == false)
            return false;
        this.ref = value;
        return true;
    }
}

