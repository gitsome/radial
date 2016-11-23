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
        padding: 1,
        mouseover: $.noop,
        mouseout: $.noop,
        mousedown: $.noop,
        mouseup: $.noop,
        click: $.noop
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

            layout_radius = (options.h - 2 * options.padding) / 2;
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
            var transformGroup = [];

            for(var i=0; i < shapeData.length; i++) {

                var shapei = $.extend({}, shapeData[i]);

                var isPartOfGroup = transform.configs.groups && shapei.group !== undefined && transform.configs.groups.indexOf(shapei.group) !== -1;
                var isPartOfShapes = transform.configs.shapes && transform.configs.shapes.indexOf(shapei.id) !== -1;

                var noClassification = !transform.configs.groups && !transform.configs.shapes;

                // check if this one is allowed
                if(isPartOfGroup || isPartOfShapes ||  noClassification) {
                    transformGroup.push(shapei);
                }

                shapeDataNew.push(shapei);
            }

            var group_length = transformGroup.length;

            for(var i=0; i < group_length; i++) {

                var shapei = transformGroup[i];

                // now iterate through all fields and apply transforms
                for(var field in transformFields) {
                    if(transformFields.hasOwnProperty(field)){

                        var transformType = transformFieldsMap[field];
                        var newValue = transformFields[field];
                        var newValueCalculated = typeof(newValue) === "function" ? newValue(shapei, i, group_length) : newValue;

                        if(transformType === "style") {
                            shapei[field] = newValueCalculated;
                        } else if (transformType === "path") {
                            shapei.target[field] = newValueCalculated;
                        }
                    }
                }
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
            // while (angle < 0) angle = angle + 360;
            // while (angle >= 360) angle = angle - 360;
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

                for(var i=0; i <  nextTransform.stack.length; i++) {
                    currentShapes = getTransformedData(currentShapes, nextTransform.stack[i]);
                }

                draw(currentShapes, {speed: nextTransform.speed, delay: nextTransform.delay});
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
                speed: 0,
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
                        .attr("transform", "translate("+ layout_origin.x + "," + layout_origin.y +")")
                    .on("mouseover", function(d) {
                        options.mouseover(d, this);
                    })
                    .on("mouseout",  function(d) {
                        options.mouseout(d, this);
                    })
                    .on("click",  function(d) {
                        options.click(d, this);
                    })
                    .on("mousedown",  function(d) {
                        options.mousedown(d, this);
                    })
                    .on("mouseup",  function(d) {
                        options.mouseup(d, this);
                    });


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

            var group, isPartOfGroup, isPartOfShapes, noClassification, transform;
            for(var i=0; i < transformPlaylist.length; i++) {

                var stack = [];

                for(var j=0; j < transformPlaylist[i].transforms.length; j++) {

                    transform = transformPlaylist[i].transforms[j];
                    group = [];

                    for(var k=0; k < shapes.length; k++) {

                        isPartOfGroup = transform.groups && shapes[k].group !== undefined && transform.groups.indexOf(shapes[k].group) !== -1;
                        isPartOfShapes = transform.shapes && transform.shapes.indexOf(shapes[k].id) !== -1;

                        noClassification = !transform.groups && !transform.shapes;

                        if(isPartOfGroup || isPartOfShapes ||  noClassification) {
                            group.push(shapes[k]);
                        }
                    }

                    stack.push({
                        type: Radial.transforms[transform.type](group, transform.configs, shapes),
                        configs: {
                            shapes: transform.shapes,
                            groups: transform.groups
                        }
                    });
                }

                transformStack.push({stack: stack, group: group, configs: transformOptions, speed: transformPlaylist[i].speed, delay: transformPlaylist[i].delay});
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

        pause: function (originalShapes, configs) {
            return {};
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
                color: '#ddd',
                stroke: '#d5d5d5',
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

    Radial.PathCreator = function() {

        var self = this;

        var path = "";

        self.close = function () {
            path = path + 'Z';
            return self;
        },

        self.moveTo = function(pt) {
            path = path + "m " + pt.x + " " + pt.y + " ";
            return self;
        };

        self.MoveTo = function(pt) {
            path = path + "M " + pt.x + " " + pt.y + " ";
            return self;
        };

        self.lineTo = function(pt) {
            path = path + "l " + pt.x + " " + pt.y + " ";
            return self;
        };

        self.LineTo = function(pt) {
            path = path + "L " + pt.x + " " + pt.y + " ";
            return self;
        };

        self.cTo = function(cPt1, cPt2, target) {
            path = path + "c " + cPt1.x + " " + cPt1.y + " " + cPt2.x + " " + cPt2.y + " " + target.x + " " + target.y + " ";
            return self;
        };

        self.CTo = function(cPt1, cPt2, target) {
            path = path + "C " + cPt1.x + " " + cPt1.y + " " + cPt2.x + " " + cPt2.y + " " + target.x + " " + target.y + " ";
            return self;
        };

        self.aTo = function(focus, angle, large, sweep, target) {
            path = path + "a" + focus.x + "," + focus.y + " " + angle + " " + large + "," + sweep + " " + target.x + "," + target.y + " ";
            return self;
        };

        self.ATo = function(focus, angle, large, sweep, target) {
            path = path + "A" + focus.x + "," + focus.y + " " + angle + " " + large + "," + sweep + " " + target.x + "," + target.y + " ";
            return self;
        };

        self.path = function () {
            return path;
        };

        return self;
    };

    Radial.shapes = {
        arc: function (options) {
            var arc = d3.svg.arc()
            .innerRadius(function(d){return d.innerRadius;})
            .outerRadius(function(d){return d.outerRadius;})
            .startAngle(function(d){return -Radial.toRadians(d.angle + d.arcLength /2 - 90);})
            .endAngle(function(d){return -Radial.toRadians(d.angle - d.arcLength /2 - 90);});

            if(arc.cornerRadius) {
                arc.cornerRadius(function(d){return options.cornerRadius || 0});
            }

            return arc;
        },
        pizzaSlice: function (options) {
            return d3.svg.pizzaSlice()
                .cornerPercent(function(d){return options.cornerPercent || 0.5;});
        },
        halfCircleIn: function (options) {
            return d3.svg.halfCircleIn();
        },
        circle: function (options) {
            return d3.svg.circle();
        },
        tearDrop: function (options) {
            return d3.svg.tearDrop();
        },
        chevron: function (options) {
            return d3.svg.chevron(options);
        },
        trapezoid: function (options) {
            return d3.svg.trapezoid(options);
        }
    };

    Radial.toRadians = function (a) { return a * (Math.PI/180); };

    Radial.distance = function (p, q) {
        return Math.sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y));
    };

    Radial.circleFromThreePoints = function (A, B, C) {
        var m_r = (B.y-A.y)/(B.x - A.x);
        var m_t = (B.y-C.y)/(B.x - C.x);

        var center = {
            x: (m_r * m_t * (C.y - A.y) + m_r * (B.x + C.x) - m_t * (A.x + B.x)) / (2 * (m_r - m_t))
        };
        center.y = (-1 / m_r) * (center.x - (A.x + B.x)/2 ) + (A.y + B.y)/2;
        return {center: center, radius: Radial.distance(center, B)};
    };


})();