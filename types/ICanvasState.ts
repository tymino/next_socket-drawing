interface IPositionBrush {
  x: number;
  y: number;
}

interface IBrush {
  color: string;
  size: number;
  down: boolean;
}

interface IStrokes {
  color: string;
  size: number;
  points: IPositionBrush[];
}

export type { IPositionBrush, IBrush, IStrokes };
