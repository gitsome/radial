
var colorfulTransforms = [];

(function() {

    colorfulTransforms.push({
        transforms:[
            {type: 'white'}
        ],
        delay: Radial.DELAY_BY_INDEX,
        speed: 400
    });

    colorfulTransforms.push({
        transforms:[
            {type: 'rotate', configs: {rotation: 360}}
        ],
        delay: Radial.DELAY_BY_INDEX,
        speed: 600
    });

    colorfulTransforms.push({
        transforms:[
            {type: 'restore', configs: {color: true, stroke: true}}
        ],
        delay: 0,
        speed: 400
    });

    colorfulTransforms.push({
        transforms:[
            {type: 'rotate', configs: {rotation: 360}}
        ],
        delay: Radial.DELAY_BY_INDEX,
        speed: 600
    });

    colorfulTransforms.push({
        transforms:[
            {type: 'innerHalf', groups: ['cool']},
            {type: 'outerHalf', groups: ['warm']}
        ],
        speed: 600
    });

    colorfulTransforms.push({
        transforms:[
            {type: 'arcLength', groups: ['cool'], configs: {arcLength: 120}},
            {type: 'arcLength', groups: ['warm'],  configs: {arcLength: 90}},
            {
                type: 'custom',
                groups: ['cool'],
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
                groups: ['warm'],
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

    colorfulTransforms.push({
        transforms:[
            {type: 'rotate', groups: ['cool'], configs: {rotation: -720}},
            {type: 'rotate', groups: ['warm'], configs: {rotation: 360}}
        ],
        speed: 1500
    });

    colorfulTransforms.push({
        transforms:[
            {type: 'restore', configs: {angle:true, arcLength:true}}
        ],
        delay: 0,
        speed: 500
    });

    colorfulTransforms.push({
        transforms:[
            {type: 'restore', configs: {inner:true, outer: true}}
        ],
        delay: 0,
        speed: 600
    });

    colorfulTransforms.push({
        transforms:[{type: 'shrink'}],
        delay: 0,
        speed: 200
    });

    colorfulTransforms.push({
        transforms:[{type: 'grow'}],
        delay: 0,
        speed: 100
    });

    colorfulTransforms.push({
        transforms:[
            {type: 'restore', configs: {color: true, stroke: true}}
        ],
        delay: Radial.DELAY_BY_INDEX,
        speed: 100,
    });

    colorfulTransforms.push({
        transforms:[
            {type: 'arcLength', configs: {arcLength: Math.round(Math.random()* 150) + 10 }}
        ],
        delay: Radial.DELAY_BY_INDEX,
        speed: 500
    });

    colorfulTransforms.push({
        transforms:[
            {type: 'arcLength', configs: {arcLength: Math.round(Math.random()* 150) + 10 }}
        ],
        speed: 200
    });


    colorfulTransforms.push({
        transforms:[{type: 'pause'}],
        speed: 200
    });

    colorfulTransforms.push({
        transforms:[
            {type: 'rotate', configs: {rotation: Math.round(Math.random() * 120) - 60 }}
        ],
        speed: 400
    });

    colorfulTransforms.push({
        transforms:[
            {type: 'restore'}
        ],
        speed: 700
    });

    colorfulTransforms.push({
        transforms:[{type: 'shrink'}],
        delay: 0,
        speed: 300
    });

    colorfulTransforms.push({
        transforms:[{type: 'grow'}],
        delay: 0,
        speed: 200
    });

    colorfulTransforms.push({
        transforms:[{type: 'pause'}],
        speed: 300
    });

    colorfulTransforms.push({
        transforms:[
            {type: 'opacity', configs: {opacity: 0.4 }}
        ],
        speed: 200
    });

    colorfulTransforms.push({
        transforms:[
            {type: 'opacity', configs: {opacity: 1.0 }}
        ],
        speed: 250
    });

})();