import express from 'express';
import prisma from '../../db.js';

const zoneRouter = express.Router();

zoneRouter.post('/', async (req, res) => {
    console.log('[POST] homelab::zone');
    try {
        const { name, color, type } = req.body;
        const newZone = await prisma.Zone.create({
            data: { name : name, color : color, type : type },
        });
        return res.status(200).json({
            status : 'ok',
            zone : newZone
        });
    } catch (error) {
        console.error('Error creating zone:', error);
        return res.status(500).json({ error: 'Failed to create zone' });
    }
});

zoneRouter.delete('/:id', async (request, response)=>{
    try {
        const zid = parseInt(request.params.id);
        const deleted = await prisma.Zone.delete({
            where : {
                id : zid
            }
        });
        console.log('deleted zone', deleted);
        return response.status(200).json({
            status : 'ok',
            deleted : deleted
        });
    } catch(error) {
        console.error(error.message);
        return response.status(500).json({error : error.message});
    }
})

zoneRouter.get('/', async (req, res) => {
    try {
        const zones = await prisma.Zone.findMany();
        return res.status(200).json(zones.length > 0 ? zones : []);
    } catch (error) {
        console.error('Error fetching zones:', error);
        return res.status(500).json({ error: 'Failed to fetch zones' });
    }
});

export default zoneRouter;
