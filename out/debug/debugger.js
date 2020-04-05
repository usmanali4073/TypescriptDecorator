"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logRoute() {
    return function (target, propertyKey, descriptor) {
        const original = descriptor.value;
        descriptor.value = function (...args) {
            let req = args[0];
            console.log(req);
            console.log(`${req.url} ${req.method} called`);
            return original.apply(this, args);
        };
    };
}
exports.logRoute = logRoute;
//# sourceMappingURL=debugger.js.map