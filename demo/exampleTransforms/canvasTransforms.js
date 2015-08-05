
var canvasTransforms = [];

(function() {

    canvasTransforms.push({
        transforms:[
            {type: 'rotate', groups: ['outer'], configs: {rotation: 360}},
            {type: 'rotate', groups: ['inner'], configs: {rotation: 67.5}}
        ],
        delay: 0,
        speed: 800
    });

    canvasTransforms.push({
        transforms:[
            {type: 'restore', groups: ['inner'], configs: {angle: true}}
        ],
        delay: 0,
        speed: 800
    });

    canvasTransforms.push({
        transforms:[
            {type: 'innerHalf', groups: ['outer']},
            {type: 'outerHalf', groups: ['inner']},
            {type: 'color', groups: ['inner'], configs: {color:'#FF8800'}}
        ],
        speed: 600
    });

    canvasTransforms.push({
        transforms:[
            {type: 'restore', configs: {innerRadius: true, outerRadius: true}}
        ],
        delay: 0,
        speed: 400
    });

    canvasTransforms.push({
        transforms:[
            {type: 'restore', configs: {color: true, stroke: true}}
        ],
        delay: 0,
        speed: 400
    });

    canvasTransforms.push({
        transforms:[{type: 'shrink'}],
        delay: 0,
        speed: 400
    });

    canvasTransforms.push({
        transforms:[{type: 'grow'}],
        delay: 0,
        speed: 600
    });

    canvasTransforms.push({
        transforms:[{type: 'restore'}],
        delay: 0,
        speed: 600
    });

})();