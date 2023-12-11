import { FC } from "react";
import { Circuit } from "./circuit/circuit";
import { Node } from "./circuit/node";
import { AmpermetrNode } from "./circuit/staff/ampermetr";
import { KeyPlateNode } from "./circuit/staff/keyPlate";
import { LampNode } from "./circuit/staff/lamp";
import { Ampermetr, Batery, KeyPlate, Lamp } from "./staff";

interface CircuitNodeByIndexProps {
  index: number;
  circuitState: Circuit;
}

// тут впадлу правильный тайпинг высчитывать
const rendererByIdMap: Record<string, (node: any) => any> = {
  'BATERY': (node: Node) => <Batery />,
  'EMPTY': () => <div />,
  'LAMP': (node: LampNode) => <Lamp percent={node.getLightPercent()} />,
  'KEY_PLATE': (node: KeyPlateNode) => <KeyPlate throughable={node.throughable} onClick={node.toggleThroughable.bind(node)} />,
  'AMPERMETR': (node: AmpermetrNode) => <Ampermetr currentStrength={node.getCurrentStrength()} />
}

export const CircuitNodeByIndex: FC<CircuitNodeByIndexProps> = ({ index, circuitState }) => {

  const node = circuitState.getNodeByIndex(index).value
  return (
    <div>{rendererByIdMap[node.id](node)}</div>
  )
}