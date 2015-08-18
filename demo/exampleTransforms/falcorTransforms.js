
var falcorTransforms = [];

(function() {

    falcorTransforms.push({
        transforms:[
            {type: 'rotate', shapes: ['green', 'blue'], configs: {rotation: 60}},
            {type: 'rotate', shapes: ['purple'], configs: {rotation: 240}},
            {type: 'innerHalf', shapes:['purple']}
        ],
        delay: 0,
        speed: 400
    });

    falcorTransforms.push({
        transforms:[{type: 'pause'}],
        delay: 0,
        speed: 200
    });

    falcorTransforms.push({
        transforms:[
            {
                type: 'custom',
                shapes:['blue'],
                configs:{
                    custom: function (d) {
                        return {
                            arcLength: 180,
                            angle: 180
                        }
                    }
                }
            },
            {
                type: 'custom',
                shapes:['green'],
                configs:{
                    custom: function (d) {
                        return {
                            arcLength: 180,
                            angle: 360
                        }
                    }
                }
            },
            {
                type: 'custom',
                shapes:['purple'],
                configs:{
                    custom: function (d) {
                        return {
                            arcLength: 180
                        }
                    }
                }
            }
        ],
        delay: 0,
        speed: 400
    });

    falcorTransforms.push({
        transforms:[{type: 'restore'}],
        delay: 0,
        speed: 600
    });

    falcorTransforms.push({
        transforms:[{
            type: 'custom',
            shapes: ['green'],
            configs:{
                custom: function (d) {
                    return {
                        inner: 0.0
                    }
                }
            }
        }],
        delay: 0,
        speed: 300
    });

    falcorTransforms.push({
        transforms:[{type: 'pause'}],
        delay: 0,
        speed: 400
    });

    falcorTransforms.push({
        transforms:[{
            type: 'custom',
            configs:{
                custom: function (d) {
                    return {
                        inner: 0.0
                    }
                }
            }
        }],
        delay: 0,
        speed: 300
    });

    falcorTransforms.push({
        transforms:[{type: 'pause'}],
        delay: 0,
        speed: 400
    });

    falcorTransforms.push({
        transforms:[{
            type: 'restore',
            configs:{
                inner: true
            }
        }],
        delay: 0,
        speed: 300
    });

    falcorTransforms.push({
        transforms:[{type: 'shrink'}],
        delay: 0,
        speed: 300
    });

    falcorTransforms.push({
        transforms:[{type: 'grow'}],
        delay: 0,
        speed: 300
    });



})();