
var startDemo;

var colorfulPizzaShapes = colorfulPizzaShapes || [];
var colorfulArcShapes = colorfulArcShapes || [];

var canvasLogoShapes = canvasLogoShapes || [];
var canvasLogoShapesAlt = canvasLogoShapesAlt || [];

var ubuntuShapes = ubuntuShapes || [];
var ubuntuShapesAlt = ubuntuShapesAlt || [];

var colorfulTransforms = colorfulTransforms || [];
var canvasTransforms = canvasTransforms || [];
var ubuntuTransforms = ubuntuTransforms || [];

var falcorTransforms = falcorTransforms || [];
var falcorTransformsAlt = falcorTransformsAlt || [];

var ephoxShapes = ephoxShapes || [];
var ephoxTransforms = ephoxTransforms || [];

(function () {

    startDemo = function () {

        setupDemoOne();
        setupDemoTwo();

        setupDemoThree();
        setupDemoFour();

        setupDemoFive();
        setupDemoSix();

        setupDemoSeven();
        setupDemoEight();

        setupDemoNine();
        setupDemoTen();
    };

    function setupDemoOne () {

        var container = $('.target1');

        var radial = new Radial(container, colorfulArcShapes, {});

        container.click(function () {
            radial.transform(colorfulTransforms, {});
        });
    }

    function setupDemoTwo () {

        var container = $('.target2');

        var radial = new Radial(container, colorfulPizzaShapes, {});

        container.click(function () {
            radial.transform(colorfulTransforms, {});
        });
    }

    function setupDemoThree () {

        var container = $('.target3');

        var radial = new Radial(container, ubuntuShapes, {padding: 5});

        container.click(function () {
            radial.transform(ubuntuTransforms, {});
        });
    }

    function setupDemoFour () {

        var container = $('.target4');

        var radial = new Radial(container, ubuntuShapesAlt, {padding: 5});

        container.click(function () {
            radial.transform(ubuntuTransforms, {});
        });
    }

    function setupDemoFive () {

        var container = $('.target5');

        var radial = new Radial(container, canvasLogoShapes, {});

        container.click(function () {
            radial.transform(canvasTransforms, {});
        });
    }

    function setupDemoSix () {

        var container = $('.target6');

        var radial = new Radial(container, canvasLogoShapesAlt, {});

        container.click(function () {
            radial.transform(canvasTransforms, {});
        });
    }

    function setupDemoSeven () {

        var container = $('.target7');

        var radial = new Radial(container, falcorShapes, {});

        container.click(function () {
            radial.transform(falcorTransforms, {});
        });
    }

    function setupDemoEight () {

        var container = $('.target8');

        var radial = new Radial(container, falcorShapes, {});

        container.click(function () {
            radial.transform(falcorTransformsAlt, {});
        });
    }

    function setupDemoNine () {

        var container = $('.target9');

        var radial = new Radial(container, exaptiveShapes, {});

        container.click(function () {
            radial.transform(exaptiveTransforms, {});
        });
    }

    function setupDemoTen () {

        var container = $('.target10');

        var radial = new Radial(container, ephoxShapes, {});

        container.click(function () {
            radial.transform(ephoxTransforms, {});
        });
    }

})();