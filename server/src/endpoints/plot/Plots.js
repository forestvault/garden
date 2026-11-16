import express from 'express';
import prisma from '../../db.js';
    const plotRouter = express.Router();
    plotRouter.get('/', async (req, res) => {
        try {
            const plots = await prisma.plot.findMany();
            return res.status(200).json(plots.length > 0 ? plots : []);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch garden plots' });
        }
    });
    plotRouter.post('/', async (req, res) => {
        console.log('Received request to create garden plot:', req.body);
        try {
            const { name, url, color } = req.body;
            const newPlot = await prisma.plot.create({
                data: { name: name, location: url, color: color },
            });
            console.log('Created new garden plot:', newPlot);
            return res.status(200).json(newPlot);
        } catch (error) {
            console.log('Error creating garden plot:', error);
            res.status(500).json({ error: 'Failed to create garden plot' });
        }
    });
    plotRouter.delete('/:id', async (request, response)=>{
        try {
            const pid = parseInt(request.params.id);
            const dp = await prisma.plot.delete({
                where: {
                    id : pid
                }
            });
            console.log('Deleted plot', dp);
            return response.status(200).json({
                status : 'ok',
                deleted: dp
            })
        } catch(error) {
            console.error(error.message);
            return response.status(500).json({message : error.message});
        }
    })
export default plotRouter;