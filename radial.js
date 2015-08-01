var Radial;
(function () {

    /*============ PRIVATE UTILITY METHODS ============*/

    var copyArray = function (dataToCopy) {
        var dataCopy = [];
        for(var i=0; i < dataToCopy.length; i++) {
            dataCopy.push($.extend({}, dataToCopy[i]));
        }
        return dataCopy;
    };


    /*============ CLASS DEFINITION ============*/

    var options_default = {
        hover: {},
        click: {},
        onHover: $.noop,
        onClick: $.noop
    };

    Radial = function (container, shapes, options_in) {

        // instance reference
        var that = this;
        // merge options with the defaults
        var options = $.extend({}, options_default, options_in, true);


        /*============ PRIVATE PROPERTIES AND METHODS ============*/

        var animating = false;
        var vis;
        var shapeElems;

        var transformStack = [];
        var getCopyOfOriginalShapes = function () {
            return copyArray(shapes);
        };

        var currentShapes = getCopyOfOriginalShapes();

        var layout_radius;
        var layout_origin;
        var setDrawingDimensions = function () {

            if(!options.width) {
                options.w = $(container).width();
                options.h = $(container).height();
            }

            layout_radius = options.h / 2;
            layout_origin = {x: options.w/2, y: options.h/2};
        };

        var updateRadiusValues = function (shapes_in) {
            for(var i=0; i < shapes_in.length; i++) {
                shapes_in[i].innerRadius = shapes_in[i].inner * layout_radius;
                shapes_in[i].outerRadius = shapes_in[i].outer * layout_radius;
                if(shapes_in[i].target && shapes_in[i].target.inner !== undefined) {
                    shapes_in[i].target.innerRadius = shapes_in[i].target.inner * layout_radius;
                }
                if(shapes_in[i].target && shapes_in[i].target.outer !== undefined) {
                    shapes_in[i].target.outerRadius = shapes_in[i].target.outer * layout_radius;
                }
            }
        };

        var transformFieldsMap = {
            'color': 'style',
            'stroke': 'style',
            'strokeWidth': 'style',
            'inner': 'path',
            'outer': 'path',
            'angle': 'path',
            'arcLength': 'path'
        };

        var getTransformedData = function (shapeData, transformFields) {

            var shapeDataNew = [];

            for(var i=0; i < shapeData.length; i++) {

                var shapei = $.extend({}, shapeData[i]);
                shapei.target = {};

                // now iterate through all fields
                for(var field in transformFields) {
                    if(transformFields.hasOwnProperty(field)){

                        var transformType = transformFieldsMap[field];
                        var newValue = transformFields[field];
                        var newValueCalculated = typeof(newValue) === "function" ? newValue(shapei, i) : newValue;

                        if(transformType === "style") {
                            shapei[field] = newValueCalculated;
                        } else if (transformType === "path") {
                            shapei.target[field] = newValueCalculated;
                        }
                    }
                }

                shapeDataNew.push(shapei);
            }

            // the inner and outer percentages may have changed so update the innerRadius and outerRadius values
            updateRadiusValues(shapeDataNew);
            return shapeDataNew;
        };

        var mergeTargetValues = function (shapeData) {
            for(var i=0; i < shapeData.length; i++) {
                if(shapeData[i].target) {
                    for(var key in shapeData[i].target) {
                        shapeData[i][key] = shapeData[i].target[key];
                    }
                }
            }
        };

        var runNextTransform = function () {
            if(animating) return;

            if(transformStack.length > 0) {

                var nextTransform = transformStack.shift();
                currentShapes = getTransformedData(currentShapes, nextTransform.type);
                draw(currentShapes, nextTransform.configs);

                // here is where repeat logic would go
            }
        };

        var transformComplete = function () {
            animating = false;
            mergeTargetValues(currentShapes);
            runNextTransform();
        };


        /*============ MAIN DRAW METHOD ============*/

        var draw = function (shapes_in, transformConfigs_in) {

            animating = true;
            transformConfigs_in = transformConfigs_in || {};

            var transformConfigs = $.extend({
                speed: 600,
                delay: 0
            }, transformConfigs_in);


            /*============ SVG UPDATE ============*/

            vis.transition().duration(transformConfigs.speed)
                .attr('height', options.h).attr('width', options.w);


            /*============ SHAPES ============*/

            shapeElems = shapeElems.data(shapes_in, function(d) { return d.id; });


            /*============ SLICES ENTER ============*/

            shapeElems
                .enter().append("g")
                    .attr("class", "shape")
                    .append("path")
                        .style("fill", function(d) { return d.color; })
                        .style("stroke", function(d) { return d.stroke; })
                        .style("stroke-width", function(d) { return d.strokeWidth; })
                        .attr("d", function (d) {return d.path(d);})
                        .attr("transform", "translate("+ layout_origin.x + "," + layout_origin.y +")");


            /*============ SLICES UPDATE ============*/

            var transitionCount = 0;

            var shapeElemsTranny = shapeElems.select('path')
                .transition()
                .each(function() { transitionCount++; })
                .each("end", function(){transitionCount--;  if(transitionCount === 0) { transformComplete() }})
                .duration(transformConfigs.speed)
                    .attr("transform", "translate("+ layout_origin.x + "," + layout_origin.y +")");

            if(!transformConfigs_in) {

                shapeElemsTranny.attr("d", function (d) {return d.path(d)});

            } else {

                var delayValue = transformConfigs.delay;
                if(typeof(transformConfigs.delay) === "function") {
                    delayValue = function (d, i) { return transformConfigs.delay.apply(this, [d, i, shapes_in, transformConfigs.speed]); };
                }

                shapeElemsTranny
                    .delay(delayValue)

                    // style attributes
                    .style("fill", function(d) { return d.color; })
                    .style("stroke", function(d) { return d.stroke; })
                    .style("stroke-width", function(d) { return d.strokeWidth; })

                    // path attributes
                    .attrTween("d", function(d, i, a){

                        d.originalAngle = d.angle;
                        d.originalInnerRadius = d.innerRadius;
                        d.originalOuterRadius = d.outerRadius;
                        d.originalArcLength = d.arcLength;

                        // copy all properties and override those in the target
                        d.target = $.extend(true, {}, d, d.target);

                        return function (t) {
                            d.angle = d.originalAngle - (d.originalAngle - d.target.angle) * t;
                            d.innerRadius = d.originalInnerRadius - (d.originalInnerRadius - d.target.innerRadius) * t;
                            d.outerRadius = d.originalOuterRadius - (d.originalOuterRadius - d.target.outerRadius) * t;
                            d.arcLength = d.originalArcLength - (d.originalArcLength - d.target.arcLength) * t;
                            return d.path(d);
                        };
                    });
            }
        };



        /*============ PUBLIC METHODS ============*/

        var transformOptions_default = {
            onComplete: $.noop
        };

        that.transform = function (transforms, transformOptions_in) {

            var transforms = [].concat(transforms);
            var transformOptions = $.extend({}, transformOptions_default, transformOptions_in, true);

            var lastTransform = transforms[transforms.length -1];
            var lastTransformOnComplete = lastTransform.onComplete || $.noop;
            lastTransform.onComplete = function () {
                lastTransformOnComplete();
                transformOptions.onComplete();
            };

            for(var i=0; i < transforms.length; i++) {
                var transform = {type: Radial.transforms[transforms[i].type](shapes, transforms[i].configs), configs: {delay: transforms[i].delay, speed: transforms[i].speed }}
                transformStack.push(transform);
            }

            runNextTransform();
        };

        that.resize = function (width, height) {
            options.w = width;
            optoins.h = height;
            setDrawingDimensions();
            updateRadiusValues(currentShapes);
        };


        /*============ INITIALIZATION ============*/

        // build the template
        $(container).html('<svg></svg>');

        // set template references
        vis = d3.select($(container).find('svg')[0]);
        shapeElems = vis.selectAll(".shape");

        // apply options

        // draw
        setDrawingDimensions();
        updateRadiusValues(currentShapes);
        draw(currentShapes, {});

    };


    /*============ STATIC METHODS ============*/

    Radial.DELAY_BY_INDEX = function(d, i, allData, speed) {
        return i * speed/(allData.length * 3);
    };

    Radial.DELAY_BY_INDEX_REVERSE = function(d, i, allData, speed) {
        return (allData.length - i) * speed/(allData.length * 2);
    };

    Radial.transforms = {

        rotateAnimation: function (originalShapes, configs) {
            return {
                angle: function (d, i) {
                    return d.angle + configs.rotation;
                }
            };
        },

        shrinkAnimation: function (originalShapes) {
            return {
                inner: function(d, i){return d.inner / 5;},
                outer: function(d, i){return d.outer * 0.85;},
                angle: function(d, i){return d.angle - 25;}
            };
        },

        growAnimation: function (originalShapes) {
            return {
                inner: function (d, i) {return originalShapes[i].inner},
                outer: function (d, i) {return originalShapes[i].outer},
                angle: function(d, i){return d.angle + 25;}
            };
        },

        closeAnimation: function () {
            return {
                inner: 0,
                outer: function(d, i){return d.outer;}
            };
        },

        openAnimation: function () {
            return {
                inner: InnerRadius,
                outer: Radius
            };
        },

        grayAnimation:  function () {
            return {
                color: '#eeeeee',
                stroke: '#aaaaaa',
                strokeWidth: 1
            };
        },

        whiteAnimation: function () {
            return {
                color: '#fff',
                stroke: '#fff',
                strokeWidth: 0
            };
        },

        colorAnimation: function (originalShapes) {
            return {
                color: function(d, i) {return originalShapes[i].color;},
                stroke: function(d, i) {return originalShapes[i].stroke;},
                strokeWidth: 0
            };
        },

        arcLengthAnimation: function (originalShapes, configs) {
            return {
                arcLength: configs.arcLength
            };
        }
    };


})();