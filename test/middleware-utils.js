const middlewareRunner = async ({req, res, next}, middlewareArray) => {
    for (let middleware of middlewareArray) {
        await middleware(req, res, next);
    }
}

const asyncValidation = async (params, middlewareArray) => {
    let error = null;
    try {
        await middlewareRunner(params, middlewareArray);
    } catch (err) {
        error = err;
    }
    return error;
}


const getSpecificError =  (error, paramName) => {
    const specificError = error.errors.find(function(validationError) {
        if(validationError.param === paramName)
            return true;
    });
    return specificError;
}

module.exports = {asyncValidation, getSpecificError};