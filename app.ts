function logClass(message: string): ClassDecorator {
  console.log(`${message} evaluated`);

  return function (constructor: Function): void {
    console.log(`${message} Called`);
  };
}

function logProperty(message: string): PropertyDecorator {
  console.log(`${message} evaluated`);
  return function (target: Object, propertyKey: string): void {
    console.log(`${message} Called`);
  };
}

function logMethod(message: string): MethodDecorator {
  console.log(`${message} evaluated`);

  return function (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): void {
    console.log(`${message} evaluated`);
  };
}

function logParameter(message: string): ParameterDecorator {
  console.log(`${message} evaluated`);
  return function (
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ): void {
    console.log(`${message}   called`);
  };
}

@logClass("Class Decorator")
class Person {
  private _directReports: Person[];

  @logProperty("Property Decortor")
  public emailAddress: string;
  constructor(public firstName: string, public lastName: string) {
    this._directReports = [];
  }

  /**
   * addDirectreports
   */

  @logMethod("Method Decorator")
  @logMethod("Method Decorator two")
  public addDirectreports(@logParameter("Parameter Decorator") person: Person) {
    this._directReports.push(person);
  }
}

const person = new Person("Usman", "Ali");
