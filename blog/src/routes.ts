import express, { Request, Response } from "express";
import { randomUUID } from "crypto";
import { HttpError } from "./classes";
import { PostData } from "./types";
import { asyncHandler } from "./wrapper";
import { authenticate } from "./auth/middleware";
import { query } from "./db";
import { ErrorHandling } from "./middleware";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const data = await query(
      "SELECT id, userid, Name, Type, Description, datecreated, datemodified FROM post ORDER BY datecreated DESC"
    );

    if (!data) {
      throw new HttpError("No data in DB", 400);
    }
    res.status(200).json(data);
  })
);

router.post(
  "/create",
  authenticate,
  asyncHandler(async (req: Request, res: Response) => {
    const { name, type, description } = req.body as PostData;

    if (!name) {
      throw new HttpError("Data were not sent", 400);
    }

    if (!req.user) {
      throw new HttpError("User is not logged in", 401);
    }

    const uuid = randomUUID();
    const text = `INSERT INTO post(id, userId, "Name", "Type", "Description", datecreated, datemodified)
                VALUES ($1, $2, $3, $4, $5, NOW(), NULL) RETURNING *`;
    const values = [uuid, req.user.id, name, type || "", description || ""];

    const result = await query(text, values);
    if (!result) {
      throw new HttpError("Data were not saved into db", 500);
    } else {
      res.status(201).send("New post was saved!");
    }
  })
);

router.use(ErrorHandling);

export default router;
