//https://reactjs.org/tutorial/tutorial.html
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
  // constructor(props){
  //   super(props);
  //   this.state = {squares: Array(9).fill(null),
  //                 isX: true};
  //   this.clicked = this.clicked.bind(this);
  // }

  // clicked(i){ //BEFORE Time travel
  //   const squares = this.state.squares.slice(); //creates a copy of the array
  //   //do nothing if winner or if square has value (aka clicked before)
  //   if (calculateWinner(squares) || squares[i]) { 
  //     return;
  //   }
  //   const symbol = this.state.isX ? 'X' : 'O';
  //   squares[i] = symbol;
  //   this.setState({squares: squares,
  //                  isX: !this.state.isX});
  // }

  renderSquare(i) {
    //return <Square value={i}/>; //changed (pass prop)
    return (<Square 
            value={this.props.squares[i]}
            handleClick={() => this.props.onClick(i)} />); //pass state down
  }

  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner){
    //   status = 'Winner: ' + winner;
    // }
    // else{
    //   const symbol = this.state.isX ? 'X' : 'O';
    //   status = 'Current player: ' + symbol;
    // }
    return (
      <div>
        {/*<div className="status">{status}</div>*/}
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
  constructor(props){
    super(props);
    this.state = {history: [{squares: Array(9).fill(null)}],
                  isX: true,
                  stepNumber: 0};
    this.handleClick = this.handleClick.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }

  handleClick(i) {
    //smaller history when clicked if jumped back, otherwise will be the entire history
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); //creates a copy of the array
    if (calculateWinner(squares) || squares[i]) { 
      return;
    }
    squares[i] = this.state.isX ? 'X' : 'O';
    this.setState({history: history.concat([{squares: squares}]), //does not mutate in place
                   isX: !this.state.isX,
                   stepNumber: history.length});
  }

  jumpTo(move){
    this.setState({isX: (move % 2) === 0,
                   stepNumber: move});
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber]; //show history[move] or last if clicked
    const winner = calculateWinner(current.squares);
    let status;
    if (winner){
      status = 'Winner: ' + winner;
    }
    else{
      const symbol = this.state.isX ? 'X' : 'O';
      status = 'Current player: ' + symbol;
    }
    //each step in history (instance of squares) aka this
    //move is index (order never changes) so it is ok to use as the key
    //each one gets a button to "jump back to" that state
    const past = history.map((step, move) =>{
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return(<li key={move}><button onClick={() => this.jumpTo(move)}>{desc}</button></li>);
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={this.handleClick} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{past}</ol>
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
