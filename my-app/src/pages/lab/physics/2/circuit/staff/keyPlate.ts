import { Node, ConstructorWithoutId, emptyNodeOptions } from "../node";

export class KeyPlateNode extends Node {
  constructor(options: Pick<ConstructorWithoutId, "stateGetter">) {
    super({
      ...emptyNodeOptions,
      ...options,
      id: "KEY_PLATE",
    });

    this.throughable = false;
  }

  toggleThroughable() {
    this.throughable = !this.throughable;
    this.stateGetter.onNodeChange();
  }
}
