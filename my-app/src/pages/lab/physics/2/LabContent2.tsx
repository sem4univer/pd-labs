import { CSSProperties, ReactNode, useReducer, useState } from "react";
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from "react-beautiful-dnd";

import { circuit } from "./circuit/circuit";
import { CircuitZone } from './CircuitZone'
import classes from './PhysicLab2.module.css'

import { Batery, Lamp, KeyPlate, Ampermetr } from './staff'
import { AnswerPlace } from "../../../../common/AnswerPlace/AnswerPlace";

const staffList = ['BATERY', 'KEY_PLATE', 'LAMP', 'AMPERMETR'];

const staffNameToComponentMap: Record<typeof staffList[number], ReactNode> = {
  'BATERY': <Batery />,
  'KEY_PLATE': <KeyPlate />,
  'LAMP': <Lamp />,
  'AMPERMETR': <Ampermetr />
}

export const LabContent2 = () => {
  const [freeStaff, setFreeStaff] = useState(staffList)
  const [circuitState] = useState(circuit)
  const [horizontalRatio, setHorizontalRatio] = useState(1);
  const [, forceUpdate] = useReducer(x => x + 1, 0);


  circuitState.setUpdater(forceUpdate)

  const handleDragEnd: OnDragEndResponder = (dragEvent) => {
    if (!dragEvent.destination) return;
    // Если из свободных переносим на схему
    if (dragEvent.source.droppableId === 'staff' && dragEvent.destination.droppableId.startsWith('item')) {
      setFreeStaff((values) => values.filter(value => value !== dragEvent.draggableId))
      circuitState.changeNodeByNodeType(Number(dragEvent.destination.droppableId.split('_')[1]), dragEvent.draggableId)
      return;
    }
    // Если из схемы на свободные
    if (dragEvent.source.droppableId.startsWith('item') && dragEvent.destination.droppableId === 'staff') {
      const newFreeStaff = dragEvent.draggableId.split('@')[1];
      setFreeStaff((prevFreeStaff) => {
        if (!dragEvent.destination) return prevFreeStaff;
        return [
          ...prevFreeStaff.slice(0, dragEvent.destination.index),
          newFreeStaff,
          ...prevFreeStaff.slice(dragEvent.destination.index)
        ]
      })
      circuitState.changeNodeByNodeType(dragEvent.source.index, 'EMPTY')
      return;
    }

    //  Если из схемы на схему
    if (dragEvent.source.droppableId.startsWith('item') && dragEvent.destination.droppableId.startsWith('item')) {
      circuitState.changeNodeByNodeType(Number(dragEvent.destination.droppableId.split('_')[1]), dragEvent.draggableId.split('@')[1])
      circuitState.changeNodeByNodeType(dragEvent.source.index, 'EMPTY')
    }
  }

  const styles = { "--node-size": `${70 * (horizontalRatio)}px` } as CSSProperties;

  return (
    <div className={classes.wrapper} style={styles}>
      <DragDropContext onDragEnd={handleDragEnd} >
        <Droppable droppableId="staff" direction="horizontal">
          {(provided, snapshot) => (
            <div className={classes.staff} {...provided.droppableProps} ref={provided.innerRef}>
              {freeStaff.map((name, index) => (
                <Draggable draggableId={name} index={index} key={name}>
                  {(provided) => (
                    <div ref={provided.innerRef}
                      {...provided.draggableProps} {...provided.dragHandleProps} className={classes.staffDraggableContainer}>
                      {staffNameToComponentMap[name]}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <CircuitZone
          circuitState={circuitState}
          setHorizontalRatio={setHorizontalRatio}
          horizontalRatio={horizontalRatio}
        />
      </DragDropContext>
      <AnswerPlace />
    </div>
  )
}