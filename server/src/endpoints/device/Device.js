import express from 'express';
import prisma from '../../db.js';
import { DeviceType } from '@prisma/client';
    const deviceRouter = express.Router();
    deviceRouter.get('/types', async (request, response)=>{
        const devices = Object.values(DeviceType);
        return response.status(200).json(Object.values(DeviceType));
    });
    deviceRouter.get('/', async (req, res) => {
        try {
            const devices = await prisma.device.findMany({
                include: {
                    zones: true
                }
            });
            return res.status(200).json(devices.map(device => ({...device, online: true})));
        } catch (error) {
            console.error('Error fetching devices', error.message);
            return res.status(500).json({ error: 'Failed to fetch devices' });
        }
    });
    deviceRouter.get('/:id', async (req, res) => {
        try {
            const deviceId = req.params.id;
            const device = {}; // Replace with actual logic to fetch a device by ID
            return res.status(200).json(device);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch device' });
        }
    });
    deviceRouter.delete('/:id', async (request, response) => {
        try {
            const did = parseInt(request.params.id);
            const deleted = await prisma.device.delete({
                where: {
                    id : did
                }
            });
            console.log('deleted device'. deleted);
            return response.status(200).json({
                status : 'ok',
                deleted : deleted
            });
        } catch(error) {
            return response.status(500).json(error.message);
        }
    })
    deviceRouter.post('/', async (req, res) => {
        try {
            const { name, type, ieeeAddress, manufacturerName } = req.body;
            console.log('Creating device with name:', name, 'type:', type, 'ieeeAddress:', ieeeAddress, 'manufacturerName:', manufacturerName);
            const newDevice = await prisma.device.create({
                data: {
                    name: name,
                    type: type,
                    ieeeAddress: ieeeAddress,
                    manufacturer: manufacturerName
                }
            })
            console.log(newDevice);
            return res.status(200).json({
                status: 'ok',
                newDevice: newDevice
            });
        } catch (error) {
            console.error('Error creating device:', error);
            return res.status(500).json({ error: 'Failed to create device' });
        }
    });
    deviceRouter.put('/', async (request, response)=>{
        try {
            const { id, name, type, ieeeAddress, manufacturerName } = request.body;
            const did = parseInt(id);
            const parsedIeeeAddress = (ieeeAddress);
            const ud = await prisma.device.update({
                where: {
                    id : did
                },
                data: {
                    name : name,
                    type : type,
                    ieeeAddress : parsedIeeeAddress,
                    manufacturer: manufacturerName
                },
                include: {
                    zones : true
                }
            });
            console.log('device updated', ud);
            return response.status(200).json({
                status: 'ok',
                updated : ud
            })
        } catch(error) {
            console.error(error.message);
            return response.status(500).json({
                message : error.message
            })
        }
    });
    deviceRouter.post('/addzone', async (request, response)=>{
        console.log('/addzone');
        try {
            const { deviceId, zoneId } = request.body;
            const updatedDevice = await prisma.device.update({
                where : { id : Number(deviceId) },
                data : {
                    zones : {
                        connect: { id: Number(zoneId) }
                    }
                },
                include: {
                    zones : true
                }
            });
            console.log('updated device', updatedDevice);
            return response.status(200).json({
                status : 'ok',
                device : updatedDevice
            });
        } catch(error) {
            console.error(error.message);
            return response.status(500).json({ message : error.message });
        }
    });
    deviceRouter.post('/removezone', async(request, response) => {
        console.log('/removzone');
        try {
            const { deviceId, zoneId } = request.body;
            const device = await prisma.device.update({
                where: {
                    id : Number(deviceId)
                },
                data: {
                    zones: {
                        disconnect : { id: Number(zoneId) }
                    }
                },
                include: {
                    zones: true
                }
            });
            return response.status(200).json({
                status : 'ok',
                device : device,
                zone : zoneId
            });
        } catch(error) {
            console.error(error.message);
            return response.status(500).json({
                message : error.message
            });
        }
    });
export default deviceRouter;