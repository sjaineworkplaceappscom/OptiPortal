// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // For debugging direct to visual studio
   baseServerAPIEndpoint:"http://localhost:56986/"
  // For Deployed uri
  // baseServerAPIEndpoint:"http://localhost:8080/"
  //baseServerAPIEndpoint: "http://139.144.10.218/service/"
 // baseServerAPIEndpoint: "http://139.144.10.218:8000/"
  //baseServerAPIEndpoint: "http://139.144.10.218:8080/"

 
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
