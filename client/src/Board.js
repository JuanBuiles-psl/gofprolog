import React, { Component } from 'react'
import axios from 'axios'
import { Button, Colors } from 'react-foundation'
import Cell from './Cell'
import './Board.css'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: this.props.grid,
      generation: 0,
      running: false
    }
    this.nextGen = this.nextGen.bind(this)
    this.toggleCell = this.toggleCell.bind(this)
    this.playPause = this.playPause.bind(this)
  }

  nextGen() {
    axios.post('http://localhost:8000/nextgen', {
      grid: this.state.grid
    })
    .then(res => {
      this.setState({
        grid: res.data,
        generation: this.state.generation + 1
      })
      if (this.state.running) this.nextGen()
    }) 
  }

  playPause() {
    if (!this.state.running) this.nextGen()
    this.setState({
      running: !this.state.running
    })
  } 

  toggleCell(cell) {
    console.log(cell)
  }

  render() {
    var a = [];
    if (this.props.grid) {
      for (var row=0; row<this.state.grid.length; row++) {
        for (var col=0; col<this.state.grid[0].length; col++) {
          let cell = 
            <Cell
              dim={this.props.cellLength} col={col} row={row}
              key={row + ',' + col}
              fill={this.state.grid[row][col] ? 'white': '#2d2d2d'}
              onClick={() => this.toggleCell(this)}
              />
          a.push(cell);
        }
      }
    }
    
    return (
      <div className="game-container">
        <svg width={this.props.height} height={this.props.height} className="game-board">
          {a}
        </svg>
        <div className="side-bar" style={{width: this.props.height/3}}>
          Generation: {this.state.generation}
          <Button onClick={this.playPause} color={Colors.PRIMARY}>
            {this.state.running ? 'Pause' : 'Play'}
          </Button>
        </div>
      </div>
    )
  }
}

export default Board