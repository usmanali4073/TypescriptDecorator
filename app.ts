import APIServer from "./APIServer";
import { Request, Response } from "express";
import { Server } from "http";

const server = new APIServer();

class APIRoutes {
  @route("get", "/api")
  public indexRoute(req: Request, res: Response) {
    return {
      firstName: "Usman",
      lastName: "Ali",
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
      console.log(decriptor);
      res.status(200).json(decriptor.value(req, res));
    });
  };
}

server.start();
