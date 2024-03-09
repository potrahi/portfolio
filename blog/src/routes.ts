import express, { Request, Response } from "express";
import { randomUUID } from "crypto";
import { HttpError } from "./classes";
import { PostData } from "./types";
import { asyncHandler, withTryCatch } from "./wrapper";
import { authenticate } from "./auth/middleware";
import { query } from "./db/pool";
import {
  deleteRecordById,
  insertNewRecord,
  selectAllRecords,
  selectById,
  updateRecordById,
} from "./db/queries";
import { ErrorHandling } from "./middleware";
import { validateId } from "./utils";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const data = await query(selectAllRecords);

    if (data.rowCount === 0) {
      throw new HttpError("No data in DB", 400);
    }
    res.status(200).json(data.rows);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    validateId(id);

    const data = await query(selectById, [id]);

    if (data.rowCount === 0) {
      throw new HttpError("No data was found", 404);
    }
    console.log(data.rows);
    res.status(200).json(data.rows);
  })
);

router.post(
  "/create",
  withTryCatch(authenticate),
  asyncHandler(async (req: Request, res: Response) => {
    const { name, type, description } = req.body as PostData;

    if (!name) {
      throw new HttpError("Data were not sent", 400);
    }

    if (!req.user) {
      throw new HttpError("User is not logged in", 401);
    }

    const uuid = randomUUID();

    const result = await query(insertNewRecord, [
      uuid,
      req.user.id,
      name,
      type || "",
      description || "",
    ]);

    if (!result) {
      throw new HttpError("Data were not saved into db", 500);
    } else {
      res
        .status(201)
        .json({ message: "New post was saved!", result: result.rows[0] });
    }
  })
);

router.put(
  "/:id/update",
  withTryCatch(authenticate),
  asyncHandler(async (req: Request, res: Response) => {
    const { name, type, description } = req.body as PostData;
    const { id } = req.params;
    validateId(id);
    validateId(req.user?.id);

    const currentData = await query(selectById, [id]);
    if (currentData.rowCount === 0) {
      throw new HttpError("No data was found", 404);
    }

    if (
      name === currentData.rows[0].Name &&
      type === currentData.rows[0].Type &&
      description === currentData.rows[0].Description
    ) {
      throw new HttpError("No changes detected to update the record", 400);
    }

    const updatedData = await query(updateRecordById, [
      name,
      type,
      description,
      id,
      req.user?.id,
    ]);

    if (!updatedData) {
      throw new HttpError("The record wasn't updated", 500);
    } else {
      res.status(200).json({
        message: "The post was updated!",
        result: updatedData.rows[0],
      });
    }
  })
);

router.delete(
  "/:id/delete",
  withTryCatch(authenticate),
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    validateId(id);
    validateId(req.user?.id);
    await query(deleteRecordById, [id, req.user?.id]);
    res.status(204).send();
  })
);

router.use(ErrorHandling);

export default router;
