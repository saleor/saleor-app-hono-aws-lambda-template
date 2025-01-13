import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { config } from 'dotenv';

// Load files from .env
config();

export class SaleorAppHonoAwsLambdaTemplateStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new NodejsFunction(this, 'lambda', {
      entry: "lambda/index.tsx",
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_22_X,
      environment: {
        APL: process.env.APL!,
        UPSTASH_URL: process.env.UPSTASH_URL!,
        UPSTASH_TOKEN: process.env.UPSTASH_TOKEN!,
      }
    });

    fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE
    });

    new apigw.LambdaRestApi(this, 'api', {
      handler: fn
    })
  }
}
