import express from 'express';
import { Express, Router } from 'express';
import { configureV1Routes } from './app/v1/v1';
import { configureAdminAllRoutes } from './admin/admin-routes';

export function configureRoutes(app: Express): void {
    app.use(express.json());
    const v1 = Router();
    configureV1Routes(v1);
    app.use('/app/v1', v1);
  }


export function configureAdminRoutes(app: Express): void {
    app.use(express.json());
    const admin = Router();
    configureAdminAllRoutes(admin);
    app.use('/admin', admin);
}  