import { Node, ConstructorWithoutId, emptyNodeOptions } from "../node";

export class AmpermetrNode extends Node {
  constructor(options: Pick<ConstructorWithoutId, "stateGetter">) {
    super({
      ...emptyNodeOptions,
      ...options,
      id: "AMPERMETR",
    });
  }

  getCurrentStrength() {
    if (!this.stateGetter.getAllState().closed) return 0;
    return this.stateGetter.getAllState().currentStrength * 1000;
  }
}
