export enum AppState {
  START = 'START',
  CAMERA = 'CAMERA',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

export interface GeneratedImage {
  imageUrl: string;
  timestamp: number;
}
