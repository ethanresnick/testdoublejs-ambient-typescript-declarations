declare module "testdouble" {
  export type TestDoubleFunction = (...args: any[]) => any;

  export type TestDoubleObject<Obj> =
    { [K in keyof Obj]: TestDoubleFunction | Obj[K] }

  interface ExplainedTestDouble {
    callCount: number;
    calls: {testDouble: TestDoubleFunction, args: any[], context: any}[];
    description: string;
    isTestDouble: boolean;
  }

  interface ConfigureStub {
    thenReturn(...stubbedValues: any[]): TestDoubleFunction;
    thenThrow(...stubbedValues: any[]): TestDoubleFunction;
    thenResolve(...stubbedValues: any[]): TestDoubleFunction;
    thenReject(...stubbedValues: any[]): TestDoubleFunction;
    thenCallback(...stubbedValues: any[]): TestDoubleFunction;
    thenDo(...stubbedValues: any[]): TestDoubleFunction;
  }

  interface TestDoubleConfig {
    promise?: Function;
    ignoreWarnings?: boolean;
    suppressErrors?: boolean;
  }

  interface WhenAndVerifyConfig {
    ignoreExtraArgs?: boolean;
    times?: number;
  }

  interface ObjectConfig {
    excludeMethods: string[]
  }

  namespace Matchers {
    type MatcherDefinition = {
      name?: string,
      onCreate?: (matcherInstance: any, matcherArgs: any[]) => void,
      matches(matcherArgs: any[], actual: any): boolean
    };

    type Matcher = (...args: any[]) => boolean;

    function anything(): Matcher;
    function create(conf: MatcherDefinition): Matcher
  }

  export function config(config: TestDoubleConfig): TestDoubleConfig;
  export const matchers: typeof Matchers;

  export function func(name?: string): TestDoubleFunction;
  export { func as function }; // hack bc export function function() is syntax error.

  export function object(constructor: Function): any;
  export function object(fnNames: string[]): any;
  export function object(objectName?: string, tdConfig?: ObjectConfig): any;
  export function object<T extends { [key: string]: any }>(pojo: T): TestDoubleObject<T>;

  export function when(tdFnCall: any, config?: WhenAndVerifyConfig): ConfigureStub;
  export function verify(tdFnCall: any, config?: WhenAndVerifyConfig): undefined;
  export function explain(tdFn: TestDoubleFunction): ExplainedTestDouble;
}
