# Architecture: Digital Garden (Smart Home Controller)

This document outlines the system architecture, component breakdown, data flow, and technology stack of the Digital Garden application.

1. System Overview

Digital Garden is a smart home controller and management dashboard. It allows users to monitor and control various connected devices, group them into physical or logical areas (Zones), and manage garden plots or layout markers.

The system is split into two primary components:
    Frontend: A single-page application (SPA) built using React, Vite, and Tailwind CSS.
    Backend: A RESTful API service built using Node.js, Express, and Prisma ORM backed by a PostgreSQL database.

2. High-Level Architecture Diagram
Plaintext

 +-----------------------------------------------------------------+
 |                           Frontend                              |
 |  (React 19, Vite, React Router, Tailwind CSS, i18next)          |
 |  Runs on port 5173 (Dev) / Proxies `/api` -> Backend            |
 +-----------------------------------------------------------------+
                                  |
                                  | HTTP / REST (via Axios)
                                  v
 +-----------------------------------------------------------------+
 |                           Backend                               |
 |  (Node.js, Express, CORS, Prisma Client)                        |
 |  Runs on port 8081 (Base path: `/homelab/api`)                  |
 +-----------------------------------------------------------------+
                                  |
                                  | Prisma ORM (Driver Adapter)
                                  v
 +-----------------------------------------------------------------+
 |                           Database                              |
 |  (PostgreSQL Database)                                          |
 +-----------------------------------------------------------------+

3. Frontend Architecture

The frontend is structured modularly by features, pages, components, and services.
Directory Breakdown (frontend/src/)

    pages/: Main view entry points mapped by react-router-dom (main.jsx, devices.jsx, plots.jsx, zone.jsx, settings.jsx, about.jsx).
    components/: Reusable UI blocks and domain components:
        devices/: Device-specific UI parts, including icons (DeviceIcon.jsx), registry routing for settings (DeviceRegistry.jsx), row items (DeviceRow.jsx), and zone links.
        devices/settings/: Detailed control blocks for specific device types (Camera.jsx, Ligth.jsx, Temperature.jsx, Generic.jsx).
        form/: Input components for creating and linking entities (AddDevice.jsx, AddPlot.jsx, AddZone.jsx, ConnectZone.jsx).
    service/: API wrapper clients communicating with the backend via Axios (DeviceService.js, PlotService.js, ZoneService.js, DeviceTypesService.js).
    context/: Global state providers, such as dialog/modal managers (Dialog.jsx).
    config/: App configuration and internationalization setups (i18n.js, localization files, constants Keys.js).
    layout/: Global page layout wrappers containing header, navigation, and footer (Layout.jsx).

4. Backend Architecture

The backend is built around a lightweight Express server architecture with decoupled routers per domain entity.
Directory Breakdown (server/src/)
    index.js: Core entry point configuring middleware (cors, express.json) and mounting modular routes under the /homelab/api base path.
    db.js: Initializes and exports the singleton Prisma client instance using the PostgreSQL pool driver adapter.
    endpoints/: Entity routers handling HTTP verbs (GET, POST, PUT, DELETE):
        device/: Handles device lifecycle operations, enumerating DeviceType enums, and mapping relationship connection/disconnection hooks (addzone, removezone).
        plot/: Manages garden plots configuration and attributes.
        zone/: Manages physical or logical zoning configurations.

5. Data Model & Database Schema
Managed via Prisma ORM, the database contains three core models defined within server/prisma/Models/:
    Device:
        Attributes: id, name, ieeeAddress (unique), type (DeviceType enum: GENERIC, LIGHT, TEMPERATURE, HUMIDITY, MOTION, SENSOR, ACTUATOR, CAMERA, SWITCH, COMPUTER).
        Relations: Many-to-Many with Zone.
    Zone:
        Attributes: id, name (unique), color, type.
        Relations: Many-to-Many with Device.
    Plot:
        Attributes: id, name, location (URL), size, color, timestamps (createdAt, updatedAt).

6. Communication & Proxy Setup
    Vite Proxy: During development, frontend requests prefixed with /api are automatically intercepted and rewritten to target the Express backend (http://localhost:8081/homelab/api), avoiding CORS concerns and matching production structure constraints.

    Data Flow Pattern:
        Frontend UI components trigger asynchronous calls via *Service.js files using axios.
        Responses are verified using custom callback utilities (DashCallback) checking expected status flags (status: 'ok').
        React states update locally or refresh component trees using lifting-state or localized modal state wrappers.