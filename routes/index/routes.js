/**
 * Created by Hey on 8 Feb 2017
 */

module.exports = {
    '/':{
        'method':'get',
        'fn': function(req, res, next){
            "use strict";
            res.render('index', {title: 'hey-weather-server'});
        }
    }
};
