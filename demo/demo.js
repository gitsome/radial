
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

(function () {

    startDemo = function () {

        setupDemoOne();
        setupDemoTwo();
        setupDemoThree();
        setupDemoFour();
        setupDemoFive();
        setupDemoSix();
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

        var radial = new Radial(container, ubuntuShapes, {});

        container.click(function () {
            radial.transform(ubuntuTransforms, {});
        });
    }

    function setupDemoFour () {

        var container = $('.target4');

        var radial = new Radial(container, ubuntuShapesAlt, {});

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

})();