import React, { Component } from 'react'

class Cell extends Component {
  handleCellClicked = () => {
    this.props.handleCellClicked(this.props.row, this.props.col)
  }

  render() {
    let dim = this.props.dim
    // stroke='#ccc' strokeWidth='1'
    return (
      <rect
        width={dim+1} height={dim+1} fill={this.props.fill}
        x={dim*this.props.col} y={dim*this.props.row}
        >
      </rect>
    )
  }
}

export default Cell