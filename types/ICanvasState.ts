interface IPositionBrush {
  x: number;
  y: number;
}

interface IStrokes {
  color: string;
  size: number;
  points: IPositionBrush[];
}

export type { IPositionBrush, IStrokes };
