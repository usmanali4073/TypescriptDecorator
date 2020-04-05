function logRoute(): MethodDecorator {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      let req = args[0] as Request;
      console.log(req);
      console.log(`${req.url} ${req.method} called`);
      return original.apply(this, args);
    };
  };
}

export { logRoute };
