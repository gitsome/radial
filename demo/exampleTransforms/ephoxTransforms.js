
var ephoxTransforms = [];

(function() {

    ephoxTransforms.push({
        transforms:[
            {type: 'innerHalf', groups: ['small', 'large']}
        ],
        speed: 600
    });

    ephoxTransforms.push({
        transforms:[
            {type: 'white'}
        ],
        delay: Radial.DELAY_BY_INDEX,
        speed: 400
    });

    ephoxTransforms.push({
        transforms:[
            {type: 'rotate', configs: {rotation: 360}},
            {type: 'outerHalf', groups: ['small', 'large']}
        ],
        speed: 600
    });

    ephoxTransforms.push({
        transforms:[
            {type: 'restore', configs: {color: true, stroke: true}}
        ],
        delay: 0,
        speed: 400
    });

    ephoxTransforms.push({
        transforms:[
            {type: 'rotate', configs: {rotation: 360}},
            {type: 'innerHalf', groups: ['small', 'large']}
        ],
        speed: 600
    });

    ephoxTransforms.push({
        transforms:[
            {type: 'restore', configs: {inner:true, outer:true}}
        ],
        delay: 0,
        speed: 400
    });

    ephoxTransforms.push({
        transforms:[
            {type: 'innerHalf', groups: ['small']}
        ],
        speed: 600
    });

    ephoxTransforms.push({
        transforms:[
            {
                type: 'custom',
                groups: ['small'],
                configs: {
                    custom: function (shapes, configs) {
                        return {
                            angle: function (shape, index, total) {
                                return (360 / total) * index;
                            }
                        };
                    }
                }
            },
            {
                type: 'custom',
                groups: ['large'],
                configs: {
                    custom: function (shapes, configs) {
                        return {
                            angle: function (shape, index, total) {
                                return (360 / total) * index;
                            }
                        };
                    }
                }
            }
        ],
        speed: 600
    });

    ephoxTransforms.push({
        transforms:[
            {type: 'rotate', groups: ['small'], configs: {rotation: -540}},
            {type: 'rotate', groups: ['large'], configs: {rotation: 360}}
        ],
        speed: 1500
    });

    ephoxTransforms.push({
        transforms:[
            {type: 'restore', configs: {angle:true, arcLength:true}}
        ],
        delay: 0,
        speed: 500
    });

    ephoxTransforms.push({
        transforms:[
            {type: 'restore', configs: {inner:true, outer: true}}
        ],
        delay: 0,
        speed: 600
    });

    ephoxTransforms.push({
        transforms:[{type: 'shrink'}],
        delay: 0,
        speed: 200
    });

    ephoxTransforms.push({
        transforms:[{type: 'grow'}],
        delay: 0,
        speed: 100
    });

    ephoxTransforms.push({
        transforms:[
            {type: 'restore', configs: {color: true, stroke: true}}
        ],
        delay: Radial.DELAY_BY_INDEX,
        speed: 100,
    });

    ephoxTransforms.push({
        transforms:[{type: 'pause'}],
        speed: 200
    });

    ephoxTransforms.push({
        transforms:[
            {type: 'rotate', configs: {rotation: Math.round(Math.random() * 120) - 60 }}
        ],
        speed: 400
    });

    ephoxTransforms.push({
        transforms:[
            {type: 'restore'}
        ],
        speed: 700
    });

    ephoxTransforms.push({
        transforms:[{type: 'shrink'}],
        delay: 0,
        speed: 300
    });

    ephoxTransforms.push({
        transforms:[{type: 'grow'}],
        delay: 0,
        speed: 200
    });

    ephoxTransforms.push({
        transforms:[{type: 'pause'}],
        speed: 300
    });

    ephoxTransforms.push({
        transforms:[
            {type: 'opacity', configs: {opacity: 0.4 }}
        ],
        speed: 200
    });

    ephoxTransforms.push({
        transforms:[
            {type: 'opacity', configs: {opacity: 1.0 }}
        ],
        speed: 250
    });

})();