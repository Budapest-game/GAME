export type InnerElementType = {
  type: string,
  path: string,
  dWidth: number,
  dHeight: number,
}
export type PaddingType = {
  top: number,
  right?: number,
  bottom?: number,
  left?: number,
}
export type CoordinatesType = {
  x: number,
  y: number,
}
export type StyleTypes = {
  width: number,
  height: number,
  coordinates?: CoordinatesType | undefined,
  padding?: PaddingType,
  borderWidth?: number,
  borderColor?: string,
  background?: string,
  paddingBackground?: string,
}
export type DrawResultType = {
  innerElement: InnerElementType|null,
  innerCoordinates: CoordinatesType,
  neighbors: {
    top: DrawResultType|null,
    right: DrawResultType|null,
    bottom: DrawResultType|null,
    left: DrawResultType|null,
  }
}
