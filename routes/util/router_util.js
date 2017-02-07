/**
 * Created by Hey on 8 Feb 2017
 */

module.exports = {
    'routerAddAllRoutes': function (router, routes) {
        "use strict";
        Object.keys(routes)
            .forEach(function (path) {
                var route = routes[path];
                router[route.method](path, route.fn);
            });
    }
};