let expressValidator = require('express-validator')();

export function stubForValidation(done) {
let req = {
query: {},
body: {},
params: {},
param(name) {
return this.params[name];
}
};

return expressValidator(req, {}, () => done(req));
}


