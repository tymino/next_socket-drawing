import { IMouseTouchEvent } from '../IMouseTouchEvent';

interface ICanvasProps {
  reference: React.MutableRefObject<HTMLCanvasElement>;
  width: number;
  height: number;
  handleMouseDown: (e: IMouseTouchEvent) => void;
  handleMouseMove: (e: IMouseTouchEvent) => void;
  handleMouseUp: () => void;
}

export default ICanvasProps;
