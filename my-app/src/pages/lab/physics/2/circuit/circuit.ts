import { emptyNodeOptions, FullStateGetter, Node, NodeOptions } from "./node";
import { AmpermetrNode } from "./staff/ampermetr";
import { KeyPlateNode } from "./staff/keyPlate";
import { LampNode } from "./staff/lamp";

class CircuitNode {
  constructor(
    public value: Node,
    public isPrimary: boolean,
    public next?: CircuitNode
  ) {}
}

export class Circuit implements FullStateGetter {
  private updater?: (newCircuit: Circuit) => void;

  constructor(public rootNode?: CircuitNode) {}

  getNodeByIndex(targetIndex: number) {
    if (!this.rootNode) throw new Error("no root Node");
    let currentIndex = 0;
    let node = this.rootNode;
    while (targetIndex !== currentIndex) {
      if (!node.next) {
        throw new Error("Next node does not exist");
      }
      node = node.next;
      currentIndex++;
    }
    return node;
  }

  setUpdater(updater: (circuit: Circuit) => void) {
    this.updater = updater;
  }

  changeNodeByNodeType(replacedNodeIndex: number, nodeType: string) {
    if (!this.rootNode) throw new Error("no root Node");
    const newNode = this.createNodeByType(nodeType);
    // 3 хаха прихардкодил размер капец
    const preNodeForReplacement = this.getNodeByIndex(
      replacedNodeIndex - 1 >= 0 ? replacedNodeIndex - 1 : 3
    );
    if (!preNodeForReplacement.next) {
      throw new Error("preNodeForReplacement.next is null");
    }
    preNodeForReplacement.next.value = newNode;

    this.updater?.(this);
  }

  createNodeByType(nodeType: string) {
    if (nodeType === "EMPTY") return this.getEmptyNode("EMPTY");
    if (nodeType === "BATERY") {
      return new Node({
        id: "BATERY",
        currentStrength: 0.3,
        voltage: 12,
        resistance: 0,
        stateGetter: this,
      });
    }

    if (nodeType === "KEY_PLATE")
      return new KeyPlateNode({
        stateGetter: this,
      });
    if (nodeType === "AMPERMETR")
      return new AmpermetrNode({
        stateGetter: this,
      });
    if (nodeType === "LAMP")
      return new LampNode({
        ...emptyNodeOptions,
        stateGetter: this,
      });

    throw new Error("Unsupported nodeType");
  }

  getAllState() {
    if (!this.rootNode) throw new Error("no root Node");

    const allStates = { ...emptyNodeOptions };
    let node = this.rootNode;
    let isClosed = node.value.throughable;
    do {
      isClosed = isClosed && node.value.throughable;

      allStates.currentStrength += node.value.currentStrength;
      allStates.voltage += node.value.voltage;
      allStates.resistance += node.value.resistance;
      if (!node.next) throw new Error("node.next does not exist");
      node = node.next;
    } while (!node.isPrimary);

    return {
      ...allStates,
      closed: isClosed,
    };
  }

  onNodeChange() {
    this.updater?.(this);
  }

  getEmptyNode(id: string): Node {
    return new Node({
      ...emptyNodeOptions,
      id,
      stateGetter: this,
    });
  }
}

// const emptyNode = getEmptyNode("EMPTY");
// const batteryNode = new Node({
//   id: "BATERY",
//   currentStrength: 0.3,
//   voltage: 12,
//   resistance: 0,
// });
// const lampNode = new LampNode(emptyNodeOptions);

// const keyPlateNode = getEmptyNode("KEY_PLATE");

// const primaryCirNode = new CircuitNode(emptyNode, true);
// const batteryCirNode = new CircuitNode(batteryNode, false);
// const keyPlateCirNode = new CircuitNode(keyPlateNode, false);
// const lampCirNode = new CircuitNode(lampNode, false);

// primaryCirNode.next = batteryCirNode;
// batteryCirNode.next = keyPlateCirNode;
// keyPlateCirNode.next = lampCirNode;
// lampCirNode.next = primaryCirNode;

// const primaryCirNode = new CircuitNode(getEmptyNode("EMPTY"), true);

export const circuit = new Circuit();
const primaryCirNode = new CircuitNode(circuit.getEmptyNode("EMPTY"), true);

circuit.rootNode = primaryCirNode;

primaryCirNode.next = new CircuitNode(circuit.getEmptyNode("EMPTY"), false);
primaryCirNode.next.next = new CircuitNode(
  circuit.getEmptyNode("EMPTY"),
  false
);
primaryCirNode.next.next.next = new CircuitNode(
  circuit.getEmptyNode("EMPTY"),
  false
);
primaryCirNode.next.next.next.next = primaryCirNode;
