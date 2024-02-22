export type RouteError = {
  statusText?: string;
  message?: string;
  status: number;
  data: {
    message: string;
  };
};

export interface CustomError extends Error {
  code: number;
  info: string;
}
