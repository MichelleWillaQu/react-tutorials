import React from 'react'
import ReactDOM from 'react-dom'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// look up touch backend later

const ItemTypes = {
  KNIGHT: 'knight',
} // enum

function Knight () {
  //hook that specifies the item and an optional collector function (connect: ) 
  //connect returns an object of props
  //unpacked from an array of [propsDeclaredInsideUnpackedHere, refFunction/connector]
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.KNIGHT },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  //ref is guaranteed to be up-to-date before component mounts and updates
  //callback gets the DOM element when it mounts and null when it unmounts
  return (<div ref={drag} 
               style={{backgroundColor: isDragging ? 'red' : 'blue'}}>
            ♘
          </div>);
}

function Square (props) {
  //monitor.getItem() to retrieve the dragged item from beginDrag - not necessary
  //since only one draggable item
  //
  //can have a collecting function here that checks if monitor is currently over
  //a square ond whether it can be dropped there ---->
  // const [{ isOver, canDrop }, drop] = useDrop({
  //   accept: ItemTypes.KNIGHT,
  //   canDrop: () => canMoveKnight(x, y),
  //   drop: () => moveKnight(x, y),
  //   collect: monitor => ({
  //     isOver: !!monitor.isOver(),
  //     canDrop: !!monitor.canDrop(),
  //   }),
  // })
  const [, drop] = useDrop({
    accept: ItemTypes.KNIGHT,
    drop: () => props.changeState(props.x, props.y),
  })
  const fill = props.black ? 'black' : 'white';
  const stroke = props.black ? 'white' : 'black';
  ///{{}} represents an object in an expression
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
  // } // called with onClick = {() => this.handleClick(x, y)} in renderSquare
  // // since JS functions can save variables from the scope around it (aka closure)
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


//Example way to incorporate useDrop hook
//The style of the second div overwrites the first when the conditions are met
//

// function canMoveKnight(toX, toY) {
//   const [x, y] = knightPosition
//   const dx = toX - x
//   const dy = toY - y

//   return (
//     (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
//     (Math.abs(dx) === 1 && Math.abs(dy) === 2)
//   )
// }

// function BoardSquare({ x, y, children }) {
//   const black = (x + y) % 2 === 1
//   const [{ isOver }, drop] = useDrop({
//     accept: ItemTypes.KNIGHT,
//     drop: () => moveKnight(x, y),
//     canDrop: () => canMoveKnight(x, y),
//     collect: monitor => ({
//       isOver: !!monitor.isOver(),
//       canDrop: !!monitor.canDrop(),
//     }),
//   })

//   return (
//     <div
//       ref={drop}
//       style={{
//         position: 'relative',
//         width: '100%',
//         height: '100%',
//       }}
//     >
//       <Square black={black}>{children}</Square>
//       {isOver && !canDrop && <Overlay color="red" />}
//       {!isOver && canDrop && <Overlay color="yellow" />}
//       {isOver && canDrop && <Overlay color="green" />}
//     </div>,
//   )
// }

// function renderSquare(i, knightPosition) {
//   const x = i % 8
//   const y = Math.floor(i / 8)
//   return (
//     <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
//       <BoardSquare x={x} y={y}>
//         {renderPiece(x, y, knightPosition)}
//       </BoardSquare>
//     </div>
//   )
// }

// function renderPiece(x, y, [knightX, knightY]) {
//   if (x === knightX && y === knightY) {
//     return <Knight />
//   }
// }


//To get a custom preview image using preview ref in useDrag hook and the render
//needs to be wrapped in DragPreviewImage and connected
//...knightStyle refers to const knightStyle={blah} CSS properties
//... is the spread operator that expands an iterable (kind of unpacks and in
//the case of an object sets the keys, which may overwrite if keys are not unique)

// const [{ isDragging }, drag, preview] = useDrag({
//   item: { type: ItemTypes.KNIGHT },
//   collect: monitor => ({
//     isDragging: !!monitor.isDragging(),
//   }),
// })

// const knightImage = //url
//   render() {
//     return (
//       <>
//         <DragPreviewImage connect={preview} src={knightImage} />
//         <div
//           ref={drag}
//           style={{
//             ...knightStyle,
//             opacity: isDragging ? 0.5 : 1,
//           }}
//         >
//           ♘
//         </div>
//       </>
//     )
//   }
// }
