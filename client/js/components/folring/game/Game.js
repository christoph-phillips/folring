import React from "react";

import Piece from "./Piece";

require('./Game.css');

export default class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      pieceSelected: false,
      selectedIndex: null,
      me: 10,
      meSelected: 11,
      piecesLeft: 18,
      board: [0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      // 0 - empty slot
      // 10 - player 1 piece
      // 11 - player 1 piece selected
      // 20 - player 2 piece
      // 21 - player 2 piece selected
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.room.game) {
      const newState = {...nextProps.room.game};
      console.log('NEW GAME OBJECT', newState)
      this.setState({...newState}, () => {
        console.log("NEW STATE", this.state)
      });
    } 
  }

  sendState() {
    this.props.sendGame({game: this.state})
  }

  handleClick(piece) {
    // If clicking on empty place, add new piece
    if (this.state.board[piece] === 0) {  
      this.addPiece(piece)      
    }
    // If clicking on existing own piece, select the piece
    if (this.state.board[piece] === this.state.me && !this.state.pieceSelected) {
      this.selectPiece(piece)
    }
    // If clicking on selected piece then unselect
    if (this.state.board[piece] === this.state.meSelected && this.state.pieceSelected) {
      this.unselectPiece(piece)
    }
    // If clicking on empty place and something was selected then move the piece
    if (this.state.board[piece] === 0 && this.state.pieceSelected) {
      if (document.querySelector('#p'+piece).classList.contains("highlight")) {
        this.moveSelectedPieceTo(piece)
      }
    }
  }

  updatePiece(piece, value) {
    let nextBoard = [...this.state.board]
    nextBoard[piece] = value
    this.setState({
      board: nextBoard
    }, () => this.sendState())
  }

  selectPiece(piece) {
    this.setState({...this.state, pieceSelected: true, selectedIndex: piece }, () => this.sendState())
    this.updatePiece(piece, this.state.meSelected)
  }

  unselectPiece(piece) {
    this.setState({...this.state, pieceSelected: false, selectedIndex: null }, () => this.sendState())
    this.updatePiece(piece, this.state.me)
  }

  addPiece(piece) {
    if (this.state.piecesLeft > 0 && !this.state.pieceSelected) {
      let nextBoard = [...this.state.board]
      nextBoard[piece] = this.state.me
      this.setState({...this.state, piecesLeft: (this.state.piecesLeft - 1), board: nextBoard }, () => this.sendState())     
    }
  }

  clearPiece(piece) {
    this.updatePiece(piece, 0)
  }

  moveSelectedPieceTo(piece) {
    let nextBoard = [...this.state.board]
    nextBoard[piece] = this.state.me
    nextBoard[this.state.selectedIndex] = 0
    this.setState({...this.state, 
      pieceSelected: false, 
      selectedIndex: null,
      board: nextBoard
    }, () => this.sendState())
  }

  highlightNeighbours(piece) {
    const mapOfNeighbours = {
      0: [1,2,4],
      1: [0,4,7,3],
      2: [0,4,8,5],
      3: [1,7,10,6],
      4: [0,2,8,11,7,1],
      5: [2,8,12,9],
      6: [3,10,13],
      7: [1,4,11,14,10,3],
      8: [2,5,12,15,11,4],
      9: [16,12,5],
      10: [3,7,14,17,13,6],
      11: [4,8,15,18,14,7],
      12: [5,9,16,19,15,8],
      13: [6,10,17,20],
      14: [7,11,18,21,17,10],
      15: [8,12,19,22,18,11],
      16: [23,19,12,9],
      17: [10,14,21,24,20,13],
      18: [11,15,22,25,21,14],
      19: [12,16,23,26,22,15],
      20: [13,17,24,27],
      21: [14,18,25,28,24,17],
      22: [15,19,26,29,25,18],
      23: [30,26,19,16],
      24: [17,21,28,31,27,20],
      25: [18,22,29,32,28,21],
      26: [19,23,30,33,29,22],
      27: [20,24,31],
      28: [21,25,32,34,31,24],
      29: [22,26,33,35,32,25],
      30: [33,26,23],
      31: [24,28,34,27],
      32: [25,29,35,34,28],
      33: [26,30,35,29],
      34: [28,32,31,36],
      35: [29,33,32,36],
      36: [32,35,34]
    }
    mapOfNeighbours[piece].map((piece, index) => {
      document.querySelector('#p'+piece).classList.add("highlight")
    })
    this.highlightHuntingZone(piece)
  }

  highlightHuntingZone(piece) {
    const huntingZone = {
      0: [3,11,5],
      1: [6,14,8],
      2: [7,15,9],
      3: [17,11,0],
      4: [10,18,12],
      5: [0,11,19],
      6: [1,14,20],
      7: [2,15,21,13],
      8: [16,22,14,1],
      9: [2,15,23],
      10:[4,18,24],
      11:[0,5,19,25,17,3],
      12:[4,18,26],
      13:[7,21,27],
      14:[1,8,22,28,20,6],
      15:[2,9,23,29,21,7],
      16:[8,22,30],
      17:[3,11,25,31],
      18:[4,12,26,32,24,10],
      19:[5,33,25,11],
      20:[6,14,28],
      21:[7,15,29,34,27,13],
      22:[8,16,30,35,28,14],
      23:[9,29,15],
      24:[10,18,32],
      25:[11,19,33,36,31,17],
      26:[12,32,18],
      27:[13,21,34],
      28:[14,22,35],
      29:[15,23,34,21],
      30:[16,35,22],
      31:[17,25,36],
      32:[18,26,24],
      33:[19,36,25],
      34:[21,29,27],
      35:[22,30,28],
      36:[31,25,33]
    }
    huntingZone[piece].map((piece, index) => {
      document.querySelector('#p'+piece).classList.add("hunting")
    })
  }

  clearHghlights() {
    for (var i=0; i<document.querySelectorAll('.piece').length; i++) {
      document.querySelectorAll('.piece')[i].classList.remove("highlight")
      document.querySelectorAll('.piece')[i].classList.remove("hunting")
    }
  }

  render() {
    const pieces = this.state.board.map((status, index) => {
      return <Piece key={index} index={index} status={status} handleClick={this.handleClick.bind(this)} />
    })
    const neighbors = this.state.pieceSelected ? this.highlightNeighbours(this.state.selectedIndex) : this.clearHghlights()
    return (
      <div className="board">
        <div className="background"></div>
        {pieces}
      </div>
    )

  }
}


