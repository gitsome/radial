
var falcorTransformsAlt = [];

(function() {

    falcorTransformsAlt.push({
        transforms:[
            {
                type: 'custom',
                configs: {
                    custom: function (d) {
                        return {
                            color: '#fff'
                        };
                    }
                }
            }
        ],
        delay: 0,
        speed: 400
    });

    falcorTransformsAlt.push({
        transforms:[
            {type: 'rotate', configs: {rotation: 360}}
        ],
        delay: Radial.DELAY_BY_INDEX,
        speed: 600
    });

    falcorTransformsAlt.push({
        transforms:[
            {type: 'rotate', configs: {rotation: 360}}
        ],
        delay: Radial.DELAY_BY_INDEX,
        speed: 600
    });

    falcorTransformsAlt.push({
        transforms:[
            {type: 'rotate', configs: {rotation: 360}}
        ],
        delay: Radial.DELAY_BY_INDEX,
        speed: 600
    });

    falcorTransformsAlt.push({
        transforms:[{type: 'restore', configs: {
            color: true
        }}],
        delay: 0,
        speed: 600
    });

    falcorTransformsAlt.push({
        transforms:[{type: 'shrink'}],
        delay: 0,
        speed: 300
    });

    falcorTransformsAlt.push({
        transforms:[{type: 'grow'}],
        delay: 0,
        speed: 300
    });

})();