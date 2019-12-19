# Iterative Function Visualization

This is a repository that represents a skeleton of a react application including
drag and drop functionality in an SVG element.

## The Visualization

![Visualiztion Example](./imgs/example_visualization.svg)

The visualization is a very simple representative of iterative functions.
It relates closely to the [Mandelbrot Set](https://en.wikipedia.org/wiki/Mandelbrot_set)
where the function is `f_c(z) = (z**2) + c` for each iterative value of `z`

For the series here we start with `z_0 = 0` and `c` is represented by the point
the circle cursor is at on the complex plane represented in the Visualization.
Then `z_1 = f_c(z_0)`, `z_2 = f_c(z_1)` and so on. So we can define a series
`Z_c = { z_i | z_i = f_c(z_(i-1)) and z_0 = 0 }`.

We can see in this visualization that these series have a variety of behaviors.
For example, they may diverge, converge, or have periodic behaviors. They may
also be the unions of divergent, convergent or periodic sets in various
combinations.

The Mandelbrot set is defined by the set of points `C = { c | Z_c is not divergent}`
This can be a little hard to visualize, so with this simple react app it should be
possible to visualize a lot of the dynamics that are going on here.

However this is not the purpose of this app.

## Purpose

The purpose of this app was to demonstrate a few different technologies in
relation to each other:

- The use of React components to build an SVG Visualization.
- Vanilla React with drag-and-drop over SVG elements.
- Dockerizing a react app in a simple way that still allows for local development

### React SVG elements

React is able to render SVGs directly. While some people like to render them with
D3 or some other visualization library, I think that it makes a lot of sense to
start with vanilla React to render SVGs. There are a variety of reasons to do this:

- D3 and other JS visualization libraries are aging relative to the rest of the
  JS landscape.
- D3 coding patterns are very different from those that React Developers use
  which means that there's more context switching for frontend engineers.
- Visualization libraries often have their own visual style that might not be
  compatible with the style your team has developed. It's often more work to
  adjust the style of an existing visualization library rather than just implement
  the visualization yourself.

### React Drag-and-Drop over SVGs

There are existing drag-and-drop libraries that have been implemented for React
and SVGs, but after examining them, I found that they didn't provide much to
simplify development. It was simpler to hook directly to the `onMouseDown`,
`onMouseMove` and `onMouseUp` hooks directly in React. The only complexity
was determining the correct elements to place these events on.

Next Steps:
Currently the drag-and-drop implementation does not allow multiple drag, but
it is desirable to drag both a point representing a `C` value and a `z_0` value
on the complex plane.

### Dockerizing

This is a react app running directly out of the `npm start`. This repository
represents a style of dockerizing that allows for 3 different use cases:

1. No docker: `npm install && npm start`
2. Local development with docker-compose `docker-compose up`
3. Deployment building with `docker-compose build`

Each of these should be viable with the existing design.
