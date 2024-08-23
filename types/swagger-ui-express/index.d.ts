declare module 'swagger-ui-express' {
    import { RequestHandler } from 'express';
  
    export function setup(
      swaggerDoc: object,
      options?: {
        explorer?: boolean;
        customCss?: string;
        customSiteTitle?: string;
        customfavIcon?: string;
      }
    ): RequestHandler;
  
    export function serve(req: any, res: any, next: any): void;
}
  