import { FC, useState } from "react";

import classes from "./Labs.module.css";
import { useSwipeable } from "react-swipeable";
import classNames from "classnames";
import { Flex } from "antd";

const labDataset = [
  {
    component: <p></p>,
    title: (
      <>
        Лабораторная <br /> работа №1
      </>
    ),
    description: "des1",
  },
  {
    component: <p></p>,
    title: (
      <>
        Лабораторная <br /> работа №2
      </>
    ),
    description: "des2",
  },
  {
    component: <p></p>,
    title: (
      <>
        Лабораторная <br /> работа №3
      </>
    ),
    description: "des3",
  },
];

export const Labs: FC = () => {
  const [sliderIndex, setSliderIndex] = useState(0);

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      const { dir } = eventData;

      if (dir === "Left") {
        setSliderIndex((prev) =>
          prev > -1 * (labDataset.length - 1) ? prev - 1 : prev
        );
        return;
      }

      setSliderIndex((prev) => (prev < 0 ? prev + 1 : prev));
    },
  });

  return (
    <>
      <div className={classes["subjectSwitcher"]}>
        <div className={classes["summaryPoints"]}>
          <div className={classes["summaryPoint"]}></div>
        </div>
        <div className={classes["subject"]}>Физика</div>
        <div className={classes["summaryDigitals"]}>1/1</div>
      </div>

      <div {...handlers} className={classes["subjectLabs"]}>
        <div
          style={{ transform: `translateX(calc(80% * ${sliderIndex}))` }}
          className={classes["labsSlider"]}
        >
          <div style={{ width: "10%", height: "1px", flex: "none" }}></div>
          {labDataset.map((lab, index) => {
            return (
              <div key={index} className={classes["labContainer"]}>
                <div className={classes["labCard"]}>
                  <div className={classes["labTitle"]}>{lab.title}</div>
                </div>
              </div>
            );
          })}
        </div>
        <br />
        <Flex gap={5} justify="center">
          {labDataset.map((_, labIndex) => {
            const currLabIndex = sliderIndex * -1;
            const isCurrentLab = currLabIndex === labIndex;

            return (
              <div
                key={labIndex}
                onClick={() => setSliderIndex(labIndex * -1)}
                className={classNames(classes["sliderSummaryPoint"], {
                  [classes["sliderSummaryPointActive"]]: isCurrentLab,
                })}
              ></div>
            );
          })}
        </Flex>
      </div>
    </>
  );
};
