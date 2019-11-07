// Further Study:
// Display the location for each move in the format (col, row) in the move history list.
// Bold the currently selected item in the move list.
// Rewrite Board to use two loops to make the squares instead of hardcoding them.
// Add a toggle button that lets you sort the moves in either ascending or descending order.
// When someone wins, highlight the three squares that caused the win.
// When no one wins, display a message about the result being a draw.



//Component1
// class Square extends React.Component {
//   //constructor(props){ //change (added, removed during lift)
//     //super(props);
//     //this.state = {value: this.props.value};
//     // this.handleClick = this.handleClick.bind(this);
//   //}
//   // handleClick(){ //change (added, removed to lift state to parent)
//   //   //alert("I've been clicked~"); //to test interactivity (removed)
//   //   this.setState({value: 'X'});
//   // }
//   render() { //changed (1. show props, 2. make interactive, 3. removed to lift)
//     return (
//       <button 
//         className="square"
//         onClick={() => this.props.handleClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
function Square(props){ //functional component
  return (
    <button
      className="square"
      onClick={props.handleClick}>
      {props.value}
    </button>
  );
}


//Component2 - calls Square (to make 9 buttons)
class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {squares: Array(9).fill(null),
                  isX: true};
    this.clicked = this.clicked.bind(this);
  }

  clicked(i){
    const squares = this.state.squares.slice(); //creates a copy of the array
    //do nothing if winner or if square has value (aka clicked before)
    if (calculateWinner(squares) || squares[i]) { 
      return;
    }
    const symbol = this.state.isX ? 'X' : 'O';
    squares[i] = symbol;
    this.setState({squares: squares,
                   isX: !this.state.isX});
  }

  renderSquare(i) {
    //return <Square value={i}/>; //changed (pass prop)
    return (<Square 
            value={this.state.squares[i]}
            handleClick={() => this.clicked(i)} />); //pass state down
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner){
      status = 'Winner: ' + winner;
    }
    else{
      const symbol = this.state.isX ? 'X' : 'O';
      status = 'Current player: ' + symbol;
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}


//Component3 - makes one board
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


function calculateWinner(squares) { //helper function
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
