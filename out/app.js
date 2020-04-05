"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIServer_1 = __importDefault(require("./APIServer"));
const debugger_1 = require("./debug/debugger");
const server = new APIServer_1.default();
class APIRoutes {
    indexRoute(req, res) {
        return {
            firstName: "Usman",
            lastName: "Ali",
        };
    }
    peopelRoute() {
        let test = "testing 124";
        console.log("");
        return {
            Poeple: [
                {
                    firstname: "Takmeela",
                    lastName: "Ali",
                },
                {
                    firstName: "Haniya",
                    lastName: "Ali",
                },
            ],
        };
    }
}
__decorate([
    route("get", "/api"),
    debugger_1.logRoute(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], APIRoutes.prototype, "indexRoute", null);
__decorate([
    route("get", "/poeple"),
    authenticate("12345"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], APIRoutes.prototype, "peopelRoute", null);
function route(method, path) {
    return function (target, propertyKey, decriptor) {
        server.app[method](path, (req, res) => {
            console.log(decriptor.value);
            res.status(200).json(decriptor.value(req, res));
        });
    };
}
function authenticate(key) {
    return function (target, propertyKey, decriptor) {
        const original = decriptor.value;
        decriptor.value = function (...args) {
            const req = args[0];
            const res = args[1];
            const headers = req.headers;
            if (headers.hasOwnProperty("apikey") && headers.apikey == key) {
                return original.apply(this, args);
            }
            res.status(403).json({ error: "Not Authorized" });
        };
    };
}
server.start();
//# sourceMappingURL=app.js.map