import React from "react";
import {  level3, level2, level1 } from "./model/Room";
import { reDrawCanvas } from "./boundary/Boundary";
import { Model} from './model/Model.js';
import {layout} from './Layout.js';
import {moveNinja, pickKey} from './controller/Controller.js'
import { Up, Down, Left, Right } from './model/Model.js';




function App()
{
  const [model, setModel] = React.useState(new Model(level1));
  const [reDraw, forceRedraw] = React.useState(0);
  const canvasRef = React.useRef(null);


  
  React.useEffect (() =>
  {
    reDrawCanvas(model, canvasRef.current, level1)
  }, [model, reDraw])


  const moveNinjaPos = (direction) =>
  {
    moveNinja(model, direction);
    forceRedraw(reDraw + 1);
  }

  const pickKeyButton = (e) =>
  {
    pickKey(model);
    forceRedraw(reDraw + 1)
  }

  const changeLevelBtn = (level) =>
  {
    setModel(new Model(level))
    forceRedraw(reDraw + 1)
  }

  const resetBtn = (e) =>
  {
    setModel(new Model(level1))
    forceRedraw(reDraw + 1)
  }

  return (
    <main>
      <canvas tabIndex = "1"
        className = "App-canvas"
        ref = {canvasRef}
        width = "800"
        height = "800" />

    { model.isWon() ? (<label data-testid="victory-label" style={layout.victory}>You've Won!"</label>) : null }

      <button style={layout.upButton} onClick={(e) => moveNinjaPos(Up)} >UP</button>
      <button style={layout.leftButton} onClick={(e) => moveNinjaPos(Left)}>LEFT</button>
      <button style={layout.rightButton} onClick={(e) => moveNinjaPos(Right)}>RIGHT</button>
      <button style={layout.downButton} onClick={(e) => moveNinjaPos(Down)}>DOWN</button>
      <button style={layout.pickKeyButton} onClick={(e) => pickKeyButton()}>PICK KEY</button>
      <button style={layout.resetButton} onClick={(e) => resetBtn()}>RESET</button>
      <button style = {layout.level1Btn} onClick={(e) => changeLevelBtn(level1)}>Level 1</button>
      <button style = {layout.level2Btn} onClick={(e) => changeLevelBtn(level2)} >Level 2</button>
      <button style = {layout.level3Btn} onClick={(e) => changeLevelBtn(level3)}>Level 3</button>
      <label style= {layout.moveCount}>move counts: {model.getMoveNum()} </label>
    </main>
  );

}

export default App;
