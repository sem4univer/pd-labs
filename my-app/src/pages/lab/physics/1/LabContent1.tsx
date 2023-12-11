import { FC, useState } from "react";
import { Container } from "../../../../common/Container/Container";

import classes from "../Lab.module.css";
import thisLabClasses from "./LabContent1.module.css";
import { Flex } from "antd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AnswerPlace } from "../../../../common/AnswerPlace/AnswerPlace";

// const WaterMark: FC<any> = (props) => {
//   return (
//     <div className={thisLabClasses["waterMark"]}>
//       <div
//         style={{ height: `calc(${props.waterLevel} * 30px)` }}
//         className={thisLabClasses["water"]}
//       ></div>
//     </div>
//   );
// };

export const LabContent1: FC = () => {
  const [calorimeterTemperature, setCalorimeterTemperature] =
    useState<number>();
  const [calorimeterML, setCalorimeterML] = useState<number>();

  return (
    <Container>
      <DragDropContext
        onDragEnd={(event) => {
          if (event?.destination?.droppableId === "calorimeter") {
            if (event?.draggableId === "100mlHot") {
              if (calorimeterML === 60 || calorimeterML === 90) return;

              setCalorimeterML((prev) => (prev ?? 0) + 60);

              if (calorimeterTemperature === undefined) {
                const timer = setInterval(() => {
                  setCalorimeterTemperature((prev) => {
                    if (prev === 70) {
                      clearInterval(timer);
                      return prev;
                    }

                    return (prev ?? 0) + 1;
                  });
                }, 30);

                return;
              }

              if (calorimeterTemperature !== undefined) {
                const timer = setInterval(() => {
                  setCalorimeterTemperature((prev) => {
                    if (prev === 52) {
                      clearInterval(timer);
                      return prev;
                    }

                    return (prev ?? 0) + 1;
                  });
                }, 30);
              }
            } else {
              if (calorimeterML === 30 || calorimeterML === 90) return;

              setCalorimeterML((prev) => (prev ?? 0) + 30);

              if (calorimeterTemperature === undefined) {
                const timer = setInterval(() => {
                  setCalorimeterTemperature((prev) => {
                    if (prev === 20) {
                      clearInterval(timer);
                      return prev;
                    }

                    return (prev ?? 0) + 1;
                  });
                }, 30);

                return;
              }

              if (calorimeterTemperature !== undefined) {
                const timer = setInterval(() => {
                  setCalorimeterTemperature((prev) => {
                    if (prev === 52) {
                      clearInterval(timer);
                      return prev;
                    }

                    return (prev ?? 0) - 1;
                  });
                }, 30);
              }
            }
          }
        }}
      >
        <div className={classes["staff"]}>
          <Droppable droppableId="staff" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="column"
              >
                <Flex gap={12}>
                  <Draggable key={1} draggableId={"50mlCold"} index={1}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={thisLabClasses["waterMark"]}
                      >
                        <div
                          style={{
                            height:
                              calorimeterML !== 30 && calorimeterML !== 90
                                ? `calc(${1} * 30px)`
                                : "",
                          }}
                          className={thisLabClasses["water"]}
                        ></div>
                      </div>
                    )}
                  </Draggable>
                  <Draggable key={2} draggableId={"100mlHot"} index={2}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={thisLabClasses["waterMark"]}
                      >
                        <div
                          style={{
                            height:
                              calorimeterML !== 60 && calorimeterML !== 90
                                ? `calc(${2} * 30px)`
                                : "",
                          }}
                          className={thisLabClasses["water"]}
                        ></div>
                      </div>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </Flex>
              </div>
            )}
          </Droppable>
        </div>

        <br />

        <div className={classes["staff"]}>
          <Droppable droppableId="calorimeter">
            {(provided) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="column"
                >
                  <Flex justify={"center"} style={{ position: "relative" }}>
                    <div className={thisLabClasses["calorimeter"]}>
                      <div className={thisLabClasses["calorimeterTemperature"]}>
                        {calorimeterTemperature ?? "-"} ℃
                      </div>
                    </div>
                    <div
                      style={{
                        height: `${calorimeterML}px`,
                        width: `50px`,
                        bottom: "5px",
                      }}
                      className={thisLabClasses["water"]}
                    ></div>
                  </Flex>
                </div>
              );
            }}
          </Droppable>
        </div>
        <br />
        <AnswerPlace />
      </DragDropContext>
    </Container>
  );
};
