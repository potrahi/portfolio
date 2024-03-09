import { HttpError } from "./classes";

export const validateId = (id: string | undefined): void => {
  if (!id) {
    throw new HttpError("ID parameter is empty", 400);
  }
};
