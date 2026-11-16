/*
 * Checks if the parameter is function otherwise returns empty function.
 */
export const CallbackFunction=(callback)=>{
    if(typeof callback === "function") {
        return callback;
    }
    return ()=>{ };
}

/*
 * Dash callback handler.
 * Checks if response "status" field equals "ok". Callback function is
 * invoked if it does.
 */
export const DashCallback=(response, callback, checkOk = true)=>{
   let doCall = true;
    if(checkOk === true) {
        console.log('checking ok status');
        if(response.data.status !== "ok") {
            doCall=false;
        }
    }
    if(doCall) {
        CallbackFunction(callback)(response.data);
    }
}