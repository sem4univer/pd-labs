import { FC, useState } from "react";

import classes from "./Labs.module.css";
import { useSwipeable } from "react-swipeable";
import classNames from "classnames";
import { Flex } from "antd";
import { Container } from "../../common/Container/Container";
import { Link } from "react-router-dom";

const labDataset = [
  {
    link: "/physics/1",
    title: (
      <>
        Лабораторная <br /> работа №1
      </>
    ),
    description: "des1",
  },
  {
    link: "/physics/2",
    title: (
      <>
        Лабораторная <br /> работа №2
      </>
    ),
    description: "des2",
  },
  {
    link: "/physics/2",
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
      {/* Предмет */}
      <Container>
        <div className={classes["subjectSwitcher"]}>
          <div className={classes["summaryPoints"]}>
            <div className={classes["summaryPoint"]}></div>
          </div>
          <div className={classes["subject"]}>Физика</div>
          <div className={classes["summaryDigitals"]}>1/1</div>
        </div>
      </Container>

      {/* Слайдер */}
      <div {...handlers} className={classes["subjectLabs"]}>
        <div
          style={{ transform: `translateX(calc(80% * ${sliderIndex}))` }}
          className={classes["labsSlider"]}
        >
          <div style={{ width: "10%", height: "1px", flex: "none" }}></div>
          {labDataset.map((lab, index) => {
            return (
              <div className={classes["labContainer"]}>
                {/* <div key={index}> */}
                <div className={classes["labCard"]}>
                  <Link
                    style={{ display: "block", textDecoration: "none", width: '100%', height: '100%' }}
                    to={`/labs${lab.link}`}
                  >
                    <div className={classes["labTitle"]}>{lab.title}</div>
                  </Link>
                </div>
                {/* </div> */}
              </div>
            );
          })}
        </div>

        <br />

        {/* Кружочки */}
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
