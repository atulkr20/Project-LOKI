import express from 'express';
import { db } from '../db/index.js';
import { linkTrackingTable } from '../models/tracking.model.js';
import { eq } from 'drizzle-orm';

const router = express.Router();

// POST /track/event - Record tracking event
router.post('/event', async (req, res) => {
    const { shortCode, eventType, timeSpent } = req.body;
    
    console.log(`[TRACKING] ${eventType} for ${shortCode}: ${timeSpent}ms`);
    
    if (!shortCode || !eventType) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    try {
        await db.insert(linkTrackingTable).values({
            shortCode,
            eventType,
            timeSpent: timeSpent || null,
            userAgent: req.headers['user-agent'] || null,
            referrer: req.headers['referer'] || null
        });
        
        return res.json({ success: true });
    } catch (error) {
        console.error('Tracking error:', error);
        return res.status(500).json({ error: 'Tracking failed' });
    }
});

// GET /track/analytics/:shortCode - Get simplified analytics
router.get('/analytics/:shortCode', async (req, res) => {
    const { shortCode } = req.params;
    
    try {
        const events = await db
            .select()
            .from(linkTrackingTable)
            .where(eq(linkTrackingTable.shortCode, shortCode));
        
        const arrivals = events.filter(e => e.eventType === 'arrival');
        const completedScans = events.filter(e => e.eventType === 'completed_scan');
        
        // Simple: quits = arrivals - completed_scans
        const totalArrivals = arrivals.length;
        const totalCompleted = completedScans.length;
        const totalQuits = totalArrivals - totalCompleted;
        
        const completionRate = totalArrivals > 0 
            ? ((totalCompleted / totalArrivals) * 100).toFixed(1) + '%' 
            : '0%';
        
        const quitRate = totalArrivals > 0 
            ? ((totalQuits / totalArrivals) * 100).toFixed(1) + '%' 
            : '0%';
        
        return res.json({
            shortCode,
            totalArrivals,
            totalCompleted,
            totalQuits,
            completionRate,
            quitRate
        });
    } catch (error) {
        console.error('Analytics error:', error);
        return res.status(500).json({ error: 'Analytics failed' });
    }
});

export default router;
