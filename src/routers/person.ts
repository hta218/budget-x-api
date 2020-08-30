import express, { Response } from "express";
import { getPersonsByUser, savePerson, updatePerson, deletePerson } from "@models/Person";

const router = express.Router();

const handleError = (err: any, res: Response) => {
  res.json({ success: 0, err: err.toString() });
};

router.get("/", async (req, res) => {
  try {
    const userId: any = req.query.userId;
    if(!userId) {
      res.json({ success: 0, message: "Missing user's id" });
    } else {
      const persons = await getPersonsByUser(userId);
      res.json({ success: 1, persons });
    }
  } catch (err) {
    handleError(err, res);
  }
});

router.post("/", async (req, res) => {
  try {
    const person = req.body;
    const savedPerson = await savePerson(person);
    res.json({ success: 1, savedPerson });
  } catch (err) {
    handleError(err, res);
  }
});

router.put("/", async (req, res) => {
  try {
    const person = req.body;
    const updatedPerson = await updatePerson(person);
    res.json({ success: 1, updatedPerson });
  } catch (err) {
    handleError(err, res);
  }
});

router.delete("/", async (req, res) => {
  try {
    const _id: any = req.query._id;
    const deletedPerson = await deletePerson(_id);
    res.json({ success: 1, deletedPerson });
  } catch (err) {
    handleError(err, res);
  }
});

export default router;