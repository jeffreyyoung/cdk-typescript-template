import apigateway = require("@aws-cdk/aws-apigateway");
import lambda = require("@aws-cdk/aws-lambda");
import cdk = require("@aws-cdk/core");
import {Construct, App} from '@aws-cdk/core';
export class LambdaEndpoint extends Construct {

  resource: apigateway.Resource
  lambdaRef: lambda.Function
  lambdaIntegration: apigateway.LambdaIntegration

  constructor(
    scope: Construct,
    id: string,
    args: {
      api: apigateway.RestApi;
      sourceCodePath: string;
      urlPath: string;
      methods?: string[];
    }
  ) {
    super(scope, id);
    this.lambdaRef = new lambda.Function(scope, args.sourceCodePath + "Lambda", {
      code: new lambda.AssetCode(args.sourceCodePath),
      handler: "handler.handler",
      runtime: lambda.Runtime.NODEJS_10_X,
    });

    this.resource = args.api.root.addResource(args.urlPath);
    this.resource.addCorsPreflight({
      allowOrigins: apigateway.Cors.ALL_ORIGINS,
    });
    this.lambdaIntegration = new apigateway.LambdaIntegration(this.lambdaRef);
    const methods = args.methods || ["GET"];
    methods.forEach((m) => this.resource.addMethod(m, this.lambdaIntegration));
  }
}