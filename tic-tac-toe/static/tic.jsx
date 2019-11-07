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
    this.state = {squares: Array(9).fill(null)};
    //this.clicked = this.clicked.bind(this);
  }
  clicked(i){
    const squares = this.state.squares.slice(); //creates a copy of the array
    squares[i] = 'X';
    this.setState({squares: squares});
  }
  renderSquare(i) {
    //return <Square value={i}/>; //changed (pass prop)
    return <Square 
            value={this.state.squares[i]}
            handleClick={() => this.clicked(i)} />; //pass state down
  }

  render() {
    const status = 'Next player: X';

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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
