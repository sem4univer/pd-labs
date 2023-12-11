import { CSSProperties, FC, useCallback, useEffect, useRef, useState } from "react";
import classes from './PhysicLab2.module.css'

import BackgroundImage from "./images/background1.png";
import { Draggable, Droppable } from "react-beautiful-dnd";
import cn from "classnames";
import { Circuit } from "./circuit/circuit";
import { CircuitNodeByIndex } from "./CircuitNodeByIndex";

interface Position {
  left: number;
  top: number;
}

const circuitNodePosition: Position[] = [{
  left: 41,
  top: 8
}, {
  left: 74.5,
  top: 35.5
}, {
  left: 42,
  top: 62,
}, {
  left: 9,
  top: 35,
}]

const initialWidth = 356;
const initialHeight = 237;

export const COEF = 0.85;

interface CircuitZoneProps {
  circuitState: Circuit;
  setHorizontalRatio: (k: number) => void;
  horizontalRatio: number;
}

export const CircuitZone: FC<CircuitZoneProps> = ({ circuitState, setHorizontalRatio, horizontalRatio }) => {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [verticalRatio, setVerticalRatio] = useState(1);

  const getStyles = useCallback(({ left, top }: Position) => {
    return {
      left: `${left}%`,
      top: `${top * (verticalRatio + (1 - verticalRatio) * COEF)}%`,
      width: `${70 * (horizontalRatio)}px`,
      height: `${70 * (verticalRatio)}px`,
    }
  }, [horizontalRatio, verticalRatio])

  const calculateRatio = useCallback(() => {
    const newHorizontalRatio = (containerRef.current?.clientWidth ?? 0) / initialWidth;
    const newVerticalRatio = (containerRef.current?.clientHeight ?? 0) / initialHeight;
    setHorizontalRatio(newHorizontalRatio);
    setVerticalRatio(newVerticalRatio)
  }, [containerRef])

  useEffect(() => {
    window.addEventListener('resize', calculateRatio);
    // 100ms - time for loading image
    setTimeout(calculateRatio, 1000)
    return () => window.removeEventListener('resize', calculateRatio);
  }, [calculateRatio, containerRef])


  return (
    <div className={classes.staff}>
      <div className={classes.container} ref={containerRef}>
        <img src={BackgroundImage} className={classes.background} alt="electric circuit" />
        {circuitNodePosition.map((position, index) => (
          <Droppable
            droppableId={`item_${index}`}
            key={`${index}@${circuitState.getNodeByIndex(index).value.id}`}
            isDropDisabled={circuitState.getNodeByIndex(index).value.id !== 'EMPTY'}
          >
            {(provided, snapshot) => (
              <div
                className={cn([classes.droppableNodeZone, {
                  [classes.droppableNodeZoneActive]: snapshot.isDraggingOver
                }])}
                style={getStyles(position)}
                key={`${index}@${circuitState.getNodeByIndex(index).value.id}`}
                ref={provided.innerRef} {...provided.droppableProps}
              >
                <Draggable draggableId={`${index}@${circuitState.getNodeByIndex(index).value.id}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <CircuitNodeByIndex circuitState={circuitState} index={index} />
                    </div>
                  )}
                </Draggable>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </div>
  )
}