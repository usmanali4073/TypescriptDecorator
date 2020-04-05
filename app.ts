import APIServer from "./APIServer";
import { Request, Response } from "express";
import { Server } from "http";
import { logRoute } from "./debug/debugger";

const server = new APIServer();

class APIRoutes {
  @route("get", "/api")
  @logRoute()
  public indexRoute(req: Request, res: Response) {
    return {
      firstName: "Usman",
      lastName: "Ali",
    };
  }

  @route("get", "/poeple")
  @authenticate("12345")
  public peopelRoute() {
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

function route(method: string, path: string): MethodDecorator {
  return function (
    target: any,
    propertyKey: string,
    decriptor: PropertyDescriptor
  ) {
    server.app[method](path, (req: Request, res: Response) => {
      console.log(decriptor.value);
      res.status(200).json(decriptor.value(req, res));
    });
  };
}

function authenticate(key: string): MethodDecorator {
  return function (
    target: any,
    propertyKey: string,
    decriptor: PropertyDescriptor
  ) {
    const original = decriptor.value;
    decriptor.value = function (...args: any[]) {
      const req = args[0] as Request;
      const res = args[1] as Response;

      const headers = req.headers;

      if (headers.hasOwnProperty("apikey") && headers.apikey == key) {
        return original.apply(this, args);
      }
      res.status(403).json({ error: "Not Authorized" });
    };
  };
}

server.start();
