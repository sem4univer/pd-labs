import { Node, ConstructorWithoutId } from "../node";

export class LampNode extends Node {
  constructor(options: ConstructorWithoutId) {
    super({
      ...options,
      id: "LAMP",
    });
  }
  getLightPercent() {
    const voltageExists = this.stateGetter.getAllState().voltage;

    if (voltageExists && this.stateGetter.getAllState().closed) return 100;
    return 0;
  }
}
