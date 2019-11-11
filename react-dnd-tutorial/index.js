import React from 'react'
import ReactDOM from 'react-dom'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const ItemTypes = {
  KNIGHT: 'knight',
} // enum

function Knight () {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.KNIGHT },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  return <div ref={drag} style={{backgroundColor: isDragging ? 'red' : 'blue'}}
    >♘</div>;
}

function Square (props) {
    const [, drop] = useDrop({
      accept: ItemTypes.KNIGHT,
      drop: () => props.changeState(props.x, props.y),
    })
    const fill = props.black ? 'black' : 'white';
    const stroke = props.black ? 'white' : 'black';
    //{{}} represents an object in an expression
    //needs a width/height or it will not show and needs a stroke so the color
    //of the knight changes to be visible.
    return (<div ref={drop} style={{backgroundColor: fill,
                        color: stroke,
                        width: '100%',
                        height: '100%'}}>
                {props.children}
            </div>);
}

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {knightPosition: [0, 0]};
        //this.handleClick = this.handleClick.bind(this);
        this.moveKnight = this.moveKnight.bind(this);
    }
    // handleClick(x, y){
    //     this.setState({knightPosition: [x, y]});
    // } //called with onClick = {() => this.handleClick(x, y)} since JS
    // //functions can save variables from the scope around it (aka closure)
    moveKnight(x, y){
        this.setState({knightPosition: [x, y]});
    }
    renderSquare(i) {
      const [knightX, knightY] = this.state.knightPosition;
      const x = i % 8;
      const y = Math.floor(i / 8); //rounds down
      const isKnightHere = x === knightX && y === knightY;
      const black = (x + y) % 2 === 1;
      const piece = isKnightHere ? <Knight /> : null;
      return (
        <div key={i} style={{width: '12.5vw', height: '12.5vh'}}>
          <Square changeState={this.moveKnight} x={x} y={y} black={black}>{piece}</Square>
        </div>);
    }
    render(){
      const squares = []
      for (let i = 0; i < 64; i++) {
        squares.push(this.renderSquare(i))
      }
      return (<DndProvider backend={HTML5Backend}>
                <div style={{width: '100vw',
                           height: '100vh',
                           display: 'flex',
                           flexWrap: 'wrap'}}>
                  {squares}
                </div>
               </DndProvider>);
    }
}

ReactDOM.render(
  <Board />,
  document.getElementById('element')
);


// import React from 'react'
// import Square from './Square'
// import Knight from './Knight'

// export default function Board() {
//   return (
//     <div>
//       <Square black>
//         <Knight />
//       </Square>
//     </div>
//   )
// }