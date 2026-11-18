class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[], //for multiple array
        stack=""
    ){
        //overriding everything
        super(message)
        this.statusCode=statusCode
        this.data=null
        this.message=message
        this.success=false;
        this.errors=errors

        if(stack){  //for checking erro easily in production garde
            this.stack=stack
        }
        else{
        Error.captureStackTrace(this,this.constructor)
        }
}}
export {ApiError}