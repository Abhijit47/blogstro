import { defineMiddleware } from 'astro:middleware';

// import type { MiddlewareHandler } from 'astro';
// import { sequence } from 'astro:middleware';

// Approach 1
export const onRequest = defineMiddleware((context, next) => {
  /* your middleware logic */

  // intercept data from a request
  // optionally, modify the properties in `locals`
  // context.locals.title = 'New title';
  // context.locals.property = 'information';

  context.cookies.set('myCookie', 'myValue', {
    maxAge: 60 * 60 * 24, // 1 day
  });

  // return a Response or the result of calling `next()`
  return next();
});

// Approach 2
// const validation: MiddlewareHandler = async (context, next) => {
//   /* ... */
// };
// const auth: MiddlewareHandler = async (context, next) => {
//   /* ... */
// };
// const greeting: MiddlewareHandler = async (context, next) => {
//   /* ... */
// };
// export const onRequest = sequence(validation, auth, greeting);

// Approach 3
// export const onRequest: MiddlewareHandler = (context, next) => {
//   /* the middleware logic */
// };

// Approach 4
// export const onRequest: MiddlewareHandler = (context, next) => {
//   if (context.url.pathname === '/old-path') {
//     return next('/new-path');
//   }
//   return next();
// };
