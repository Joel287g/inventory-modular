export interface LoggerData {
  url: string;
  ip: string;
  request: any;
  headers: { [key: string]: string };
  method: string;
  userAgent: string;
  referer: string;
  appVersion: string;
  apiKey: string;
  error?: {}
}
