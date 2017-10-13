import React, { Component } from 'react'
import Foundation from 'react-foundation'
import Board from './Board'

class App extends Component {
  constructor(props) {
    super(props)
    let cols = 50
    let rows = 50

    let height = window.innerHeight
    let cellLength = height / rows

    this.state = {
      height,
      cellLength,
      rows,
      cols
    }
  }

  componentWillMount() {
    // fetch('http://localhost:8000/printgrid')
    // .then(res => {
    //   return res.json()
    // })
    // .then(({grid}) => {
    //   this.setState({grid})
    // })
    let grid = []
    for (let i = 0; i<this.state.rows; i++) {
      let row = []
      for (let j = 0; j<this.state.cols; j++) {
        row.push(Math.round(Math.random()*0.7))
      }
      grid.push(row)
    }
    this.setState({
      grid
    })
  }

  render() {
    return (
      <Board grid={this.state.grid}
            height={this.state.height}
            cellLength={this.state.cellLength}></Board>
    )
  }
}

export default App
