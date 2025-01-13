import { Context } from "hono";

/**
 * Hono handler signature is Context => Response
 * In order to use @saleor/app-sdk methods we need to unpack raw Web API Request object
 * and pass it to app-sdk handler function
 */
export function unpackHonoRequest(
  handlerFn: (req: Request) => Promise<Response> | Response,
) {
  return (context: Context) => {
    return handlerFn(context.req.raw);
  };
}
