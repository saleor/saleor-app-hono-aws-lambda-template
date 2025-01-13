import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'

export class SaleorAppHonoAwsLambdaTemplateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new NodejsFunction(this, 'lambda', {
      entry: "lambda/index.tsx",
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_22_X
    });

    fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE
    });

    new apigw.LambdaRestApi(this, 'api', {
      handler: fn
    })
  }
}
