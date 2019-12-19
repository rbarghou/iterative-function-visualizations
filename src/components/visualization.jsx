import React from "react";
import ReactDOM from "react-dom";

class Visualization extends React.Component {
  state = {
    cx: 0,
    cy: 0,
    x: 0,
    y: 0,
    kcx: 0,
    kcy: 0,
    kx: 0,
    ky: 0,
    _dragging: false,
    nodes: [],
    n: 300
  };

  handleDrag = e => {
    e.preventDefault();
    const { clientX, clientY } = e;
    if (this.state._dragging) {
      const { top, left } = ReactDOM.findDOMNode(this).getBoundingClientRect(),
        cx = clientX - 500 - left,
        cy = clientY - 500 - top,
        x = cx / 250,
        y = -cy / 250;

      let nodes = [],
        a = 0.0,
        b = 0.0;

      for (
        var i = 0;
        i < this.state.n;
        i++ && Math.abs(a) < 2 / 250 && Math.abs(b) < 2 / 250
      ) {
        a = a ** 2 - b ** 2 + x;
        b = 2 * a * b + y;
        if (isFinite(a) && isFinite(b) && !isNaN(a) && !isNaN(b))
          nodes.push([a * 250, b * 250]);
      }

      this.setState({
        cx: cx,
        cy: cy,
        x: x,
        y: y,
        nodes: nodes
      });
    }
  };

  handleClick = e => {
    e.preventDefault();
    const { clientX, clientY } = e;
    const { top, left } = ReactDOM.findDOMNode(this).getBoundingClientRect(),
      cx = clientX - 500 - left,
      cy = clientY - 500 - top,
      x = cx / 250,
      y = -cy / 250;
    this.setState({
      kx: x,
      ky: y,
      kcx: cx,
      kcy: cy
    });
  };

  render() {
    const lines = [
      [-500, 0, 500, 0],
      [0, -500, 0, 500],
      [-500, -10, -500, 10],
      [-250, -10, -250, 10],
      [250, -10, 250, 10],
      [500, -10, 500, 10],
      [-10, -500, 10, -500],
      [-10, -250, 10, -250],
      [-10, 250, 10, 250],
      [-10, 500, 10, 500]
    ];

    return (
      <svg
        height="1000"
        width="1000"
        transform-origin="center"
        onClick={this.handleClick}
        onMouseMove={this.handleDrag}
        onMouseUp={() => this.setState({ _dragging: false })}
      >
        <g transform="translate(500, 500)">
          {lines.map(([x1, y1, x2, y2], key) => (
            <line
              key={key}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeWidth="2"
              stroke="black"
            />
          ))}
          <circle
            cx={this.state.cx}
            cy={this.state.cy}
            r="10"
            fill="black"
            onMouseDown={() => this.setState({ _dragging: true })}
          />
          {this.state.nodes.map(([a, b], i) => (
            <circle
              key={i}
              cx={a}
              cy={b}
              r="2"
              fill="rgb({i/this.state.n},{i/this.state.n},{i/this.state.n})"
            />
          ))}
        </g>
        <text x="10" y="10" className="small">
          x = {this.state.x}
        </text>
        <text x="10" y="20" className="small">
          y = {this.state.y}
        </text>
      </svg>
    );
  }
}

export default Visualization;
