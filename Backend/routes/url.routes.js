import express from "express";
import { db } from "../db/index.js";
import { urlsTable } from "../models/url.model.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { and, eq, sql } from "drizzle-orm"; 
import { generateSerialLink } from "../utils/creepyGenerator.js";

const router = express.Router();

// 1. SHORTEN URL
router.post("/shorten", ensureAuthenticated, async function (req, res) {
  const url = req.body.url;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortCode = generateSerialLink();

  try {
    const result = await db
      .insert(urlsTable)
      .values({
        shortCode,
        targetURL: url,
        userId: req.user.id,
      })
      .returning(); 

    if (!result || result.length === 0) {
      return res.status(500).json({ error: "Database Insert Failed" });
    }

    return res.status(201).json(result[0]);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// 2. RESOLVE URL (FOR SECURITY SCAN PAGE)
// This is public so the person clicking the link can reach the destination
router.get("/resolve/:shortCode", async function (req, res) {
  const { shortCode } = req.params;

  try {
    const result = await db
      .select()
      .from(urlsTable)
      .where(eq(urlsTable.shortCode, shortCode));

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "PHRASE_NOT_FOUND_IN_VOID" });
    }

    // Increment visit count
    await db.update(urlsTable)
      .set({ visits: sql`${urlsTable.visits} + 1` })
      .where(eq(urlsTable.shortCode, shortCode));

    return res.json({ targetURL: result[0].targetURL });
  } catch (error) {
    console.error("Resolve Error:", error);
    return res.status(500).json({ error: "INTERNAL_SYSTEM_FAILURE" });
  }
});

// 3. GET HISTORY
router.get("/codes", ensureAuthenticated, async function (req, res) {
  try {
    const codes = await db
      .select() 
      .from(urlsTable)
      .where(eq(urlsTable.userId, req.user.id));
    return res.json({ codes });
  } catch (error) {
    console.error("History Error:", error);
    return res.status(500).json({ error: "Failed to fetch logs" });
  }
});

// 4. DELETE URL
router.delete("/:id", ensureAuthenticated, async function (req, res) {
  const id = req.params.id;
  try {
    await db.delete(urlsTable)
      .where(and(
        eq(urlsTable.id, id), 
        eq(urlsTable.userId, req.user.id)
      ));
    return res.status(200).json({ deleted: true });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({ error: "Failed to delete" });
  }
});

export default router;