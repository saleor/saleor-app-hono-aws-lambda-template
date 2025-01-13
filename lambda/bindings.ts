import type { LambdaEvent, LambdaContext } from 'hono/aws-lambda'

export type Bindings = {
  event: LambdaEvent
  lambdaContext: LambdaContext
}
