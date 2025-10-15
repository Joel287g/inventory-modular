export interface FilterException {
  message: string;
  name: string;
  statusCode: number;
  cause?: unknown;
  method: string;
  url: string;
  timestamp: string;
  additionalException?: unknown;
  stack: string;
}
