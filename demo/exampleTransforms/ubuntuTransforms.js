
var ubuntuTransforms = [];

(function() {

    ubuntuTransforms.push({
        transforms:[
            {type: 'rotate', groups: ['circles'], configs: {rotation: 360}},
            {type: 'rotate', groups: ['arcs'], configs: {rotation: 120}}
        ],
        delay: 0,
        speed: 800
    });

    ubuntuTransforms.push({
        transforms:[
            {type: 'innerHalf', groups: ['circles']},
            {type: 'arcLength', groups: ['circles'], configs: {arcLength: 100}},
            {type: 'outerHalf', groups: ['arcs']}
        ],
        speed: 600
    });

    ubuntuTransforms.push({
        transforms:[
            {type: 'rotate', groups: ['arcs'], configs: {rotation: 120}}
        ],
        delay: 0,
        speed: 800
    });

    ubuntuTransforms.push({
        transforms:[{type: 'shrink'}],
        delay: 0,
        speed: 400
    });

    ubuntuTransforms.push({
        transforms:[{type: 'grow'}],
        delay: 0,
        speed: 600
    });

    ubuntuTransforms.push({
        transforms:[{type: 'restore'}],
        delay: 0,
        speed: 600
    });

})();