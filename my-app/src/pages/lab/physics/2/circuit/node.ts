export interface NodeOptions {
  id: string;
  currentStrength: number;
  voltage: number;
  resistance: number;
  stateGetter: FullStateGetter;
}

export type InputNodeState = Omit<NodeOptions, "id" | "stateGetter"> & {
  /** Замкнут */
  closed: boolean;
};

export interface FullStateGetter {
  getAllState(): InputNodeState;
  onNodeChange(): void;
}

export type ConstructorWithoutId = Omit<
  ConstructorParameters<typeof Node>["0"],
  "id"
>;

export const emptyNodeOptions: Omit<NodeOptions, "id" | "stateGetter"> = {
  currentStrength: 0,
  voltage: 0,
  resistance: 0,
};

export class Node {
  /** Идентификатор ноды */
  public id: string;
  /** Сила тока */
  public currentStrength: number;
  /** Напряжение */
  public voltage: number;
  /** Сопротивление */
  public resistance: number;
  /** Пропускная способность */
  public throughable = true;

  public stateGetter: FullStateGetter;

  constructor({
    id,
    currentStrength,
    voltage,
    resistance,
    stateGetter,
  }: NodeOptions) {
    this.id = id;
    this.currentStrength = currentStrength;
    this.voltage = voltage;
    this.resistance = resistance;
    this.stateGetter = stateGetter;
  }
}
