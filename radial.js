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

        var firstDraw = true;

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
            'opacity': 'style',
            'stroke': 'style',
            'strokeWidth': 'style',
            'inner': 'path',
            'outer': 'path',
            'angle': 'path',
            'arcLength': 'path'
        };

        var clearTargetData = function (shapeData) {
            for(var i=0; i < shapeData.length; i++) {
                shapeData[i].target = {};
            }
        };

        var getTransformedData = function (shapeData, transform) {

            var transformFields = transform.type;

            var shapeDataNew = [];

            for(var i=0; i < shapeData.length; i++) {

                var shapei = $.extend({}, shapeData[i]);

                var isPartOfGroup = !transform.configs.groups || transform.configs.groups && shapei.group && transform.configs.groups.indexOf(shapei.group) !== -1;
                var isPartOfShapes = !transform.configs.shapes || transform.configs.shapes && transform.configs.shapes.indexOf(shapei.id) !== -1;

                // check if this one is allowed
                if(isPartOfGroup && isPartOfShapes) {

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

        var normalizeAngle = function (angle) {
            while (angle < 0) angle = angle + 360;
            while (angle >= 360) angle = angle - 360;
            return angle;
        };

        var normalizeAngleValues = function (shapeData) {
            for(var i=0; i < shapeData.length; i++) {
                shapeData[i].angle = normalizeAngle(shapeData[i].angle);
            }
        };

        var runNextTransform = function () {
            if(animating) return;

            if(transformStack.length > 0) {

                var nextTransform = transformStack.shift();

                clearTargetData(currentShapes);

                for(var i=0; i <  nextTransform.length; i++) {
                    currentShapes = getTransformedData(currentShapes, nextTransform[i]);
                }

                draw(currentShapes, nextTransform.configs);

                // here is where repeat logic would go
            }
        };

        var transformComplete = function () {
            animating = false;
            mergeTargetValues(currentShapes);
            normalizeAngleValues(currentShapes);
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

            if(firstDraw) {
                vis.attr('height', options.h).attr('width', options.w);
                firstDraw = false;
            } else {
                vis.transition().duration(transformConfigs.speed)
                    .attr('height', options.h).attr('width', options.w);
            }


            /*============ SHAPES ============*/

            shapeElems = shapeElems.data(shapes_in, function(d) { return d.id; });


            /*============ SLICES ENTER ============*/

            shapeElems
                .enter().append("g")
                    .attr("class", "shape")
                    .append("path")
                        .style("fill", function(d) { return d.color; })
                        .style("opacity", function(d) { return d.opacity === undefined ? 1.0 : d.opacity; })
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
                    .style("opacity", function(d) { return d.opacity === undefined ? 1.0 : d.opacity; })
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

        that.transform = function (transformPlaylist, transformOptions_in) {

            var transformPlaylist = [].concat(transformPlaylist);
            var transformOptions = $.extend({}, transformOptions_default, transformOptions_in, true);

            var lastTransform = transformPlaylist[transformPlaylist.length -1];
            var lastTransformOnComplete = lastTransform.onComplete || $.noop;
            lastTransform.onComplete = function () {
                lastTransformOnComplete();
                transformOptions.onComplete();
            };

            for(var i=0; i < transformPlaylist.length; i++) {

                var stack = [];

                for(var j=0; j < transformPlaylist[i].transforms.length; j++) {

                    stack.push({
                        type: Radial.transforms[transformPlaylist[i].transforms[j].type](shapes, transformPlaylist[i].transforms[j].configs),
                        configs: {
                            delay: transformPlaylist[i].delay,
                            speed: transformPlaylist[i].speed,
                            shapes: transformPlaylist[i].transforms[j].shapes,
                            groups: transformPlaylist[i].transforms[j].groups
                        }
                    });
                }

                transformStack.push(stack);
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
        return (d._group_length - d._group_index) * speed/(d._group_length.length * 2);
    };

    Radial.DELAY_BY_GROUP_INDEX = function(d, i, allData, speed) {
        return (d._group_length - d._group_index) * speed/(d._group_length.length * 2);
    };

    Radial.DELAY_BY_GROUP_INDEX_REVERSE = function(d, i, allData, speed) {
        return (allData.length - i) * speed/(allData.length * 2);
    };

    Radial.transforms = {

        restore: function (originalShapes, configs) {
            var props = {};
            if(!configs || configs.angle) {
                props.angle = function (d, i) {
                    return originalShapes[i].angle;
                };
            }
            if(!configs || configs.opacity) {
                props.opacity = function (d, i) {
                    return originalShapes[i].opacity;
                };
            }
            if(!configs || configs.color) {
                props.color = function (d, i) {
                    return originalShapes[i].color;
                };
            }
            if(!configs || configs.inner) {
                props.inner = function (d, i) {
                    return originalShapes[i].inner;
                };
            }
            if(!configs || configs.outer) {
                props.outer = function (d, i) {
                    return originalShapes[i].outer;
                };
            }
            if(!configs || configs.stroke) {
                props.stroke = function (d, i) {
                    return originalShapes[i].stroke;
                };
            }
            if(!configs || configs.strokeWidth) {
                props.strokeWidth = function (d, i) {
                    return originalShapes[i].strokeWidth;
                };
            }
            if(!configs || configs.arcLength) {
                props.arcLength = function (d, i) {
                    return originalShapes[i].arcLength;
                };
            }

            return props;
        },

        custom: function (originalShapes, configs) {
            return configs.custom(originalShapes, configs);
        },

        innerHalf: function (originalShapes, configs) {
            return {
                inner: 0.0,
                outer: 0.5
            };
        },

        outerHalf: function (originalShapes, configs) {
            return {
                inner: 0.5,
                outer: 1.0
            };
        },

        rotate: function (originalShapes, configs) {
            return {
                angle: function (d, i) {
                    return d.angle + configs.rotation;
                }
            };
        },

        shrink: function (originalShapes) {
            return {
                inner: function(d, i){return d.inner / 5;},
                outer: function(d, i){return d.outer * 0.85;},
                angle: function(d, i){return d.angle - 25;}
            };
        },

        grow: function (originalShapes) {
            return {
                inner: function (d, i) {return originalShapes[i].inner},
                outer: function (d, i) {return originalShapes[i].outer},
                angle: function(d, i){return d.angle + 25;}
            };
        },

        close: function () {
            return {
                inner: 0,
                outer: function(d, i){return d.outer;}
            };
        },

        open: function () {
            return {
                inner: InnerRadius,
                outer: Radius
            };
        },

        color: function (originalShapes, configs) {
            return {
                color: configs.color,
                stroke: configs.color,
                strokeWidth: 0
            };
        },

        white: function () {
            return {
                color: '#fff',
                stroke: '#fff',
                strokeWidth: 0
            };
        },

        gray:  function () {
            return {
                color: '#eeeeee',
                stroke: '#aaaaaa',
                strokeWidth: 1
            };
        },

        opacity:  function (originalShapes, configs) {
            return {
                opacity: configs.opacity
            };
        },

        black: function () {
            return {
                color: '#000',
                stroke: '#000',
                strokeWidth: 0
            };
        },

        arcLength: function (originalShapes, configs) {
            return {
                arcLength: configs.arcLength
            };
        }
    };


})();