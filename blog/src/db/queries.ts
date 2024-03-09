export const selectAllRecords =
  'SELECT id, userid, "Name", "Type", "Description", datecreated, datemodified FROM post';

export const selectById =
  'SELECT id, userid, "Name", "Type", "Description", datecreated, datemodified FROM post WHERE id = $1';

export const insertNewRecord =
  'INSERT INTO post(id, userId, "Name", "Type", "Description", datecreated, datemodified) VALUES ($1, $2, $3, $4, $5, NOW(), NULL) RETURNING *';

export const updateRecordById =
  'UPDATE post SET "Name" = $1, "Type" = $2, "Description" = $3, datemodified = NOW() WHERE id = $4 AND userid = $5 RETURNING *';

export const deleteRecordById =
  "DELETE FROM post WHERE id = $1 AND userid = $2  RETURNING *";
