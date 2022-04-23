// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    projectId: 'proyecto-paraisos',
    appId: '1:422817344968:web:e415df43489340b71324fd',
    databaseURL: 'https://proyecto-paraisos.firebaseio.com',
    storageBucket: 'proyecto-paraisos.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyDm8weiETHEznjsHMzrMPjf0rqixS6K3V0',
    authDomain: 'proyecto-paraisos.firebaseapp.com',
    messagingSenderId: '422817344968',
  },
  maps: {
    apiKey: 'AIzaSyBsFvi_Pm5eT0s0iAP9SiwgfrN0BjGcsyw'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
