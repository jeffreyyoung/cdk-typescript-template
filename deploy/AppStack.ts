import apigateway = require("@aws-cdk/aws-apigateway");
import cdk = require("@aws-cdk/core");
import { LambdaEndpoint } from "./LambdaEndpoint";


export class AppStack extends cdk.Stack {
  constructor(app: cdk.App, id: string, props: cdk.StackProps) {
    super(app, id, props);

    const api = new apigateway.RestApi(this, "mainApi", {
      restApiName: "Main Api",
    });

    new LambdaEndpoint(this, "HelloApi", {
      api,
      sourceCodePath: "dist/hello",
      urlPath: "hello",
      methods: ['GET']
    });

    new LambdaEndpoint(this, "GraphqlApi", {
      api,
      sourceCodePath: "dist/graphql",
      urlPath: "graphql",
      methods: ['POST','GET']
    });

    new LambdaEndpoint(this, "MeowApi", {
      api,
      sourceCodePath: "dist/test",
      urlPath: "meow",
      methods: ['GET']
    });
  }
}
