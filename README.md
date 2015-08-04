# Radial
Radial is a library that is used to render and animate radial based svg shapes. It uses D3 for animation and interprolation of SVG paths.

A Radial shape is an SVG entity that generates an svg path who's inputs are the following:
- angle : the angle (in degrees), between 0-360 that determines the base angle to draw from
- arcLength : the arcLength (in degrees) this shape should take up of 360 degrees
- innerRadius : the percent distance (as decimal) of the radius that is the "lower bound" of the shape
- outerRadius : the percent distance (as decimal) of the radius that is the "upper bound" of the shape

Every shape is required to use and respond to changes in these parameters to create consistent renderings and animations across all shapes.

# Dependecies
-jQuery
-D3

# Radial shapes
Radial ships with several shape extensions on the D3 library


