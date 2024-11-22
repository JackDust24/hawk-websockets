import express from 'express';
import { createServer } from 'http';
import apiRouter from './api';
import { setupWebSockets } from './websockets';
import connectMongoDB from './db/connect';
import vendorGetRoutes from './routes/venders/getForVendor';
import vendorPostRoutes from './routes/venders/postForVendor';
import vendorUpdateRoutes from './routes/venders/updateFOrVendor';
import UserGetRoutes from './routes/users/getForUser';
import UserPostRoutes from './routes/users/postForUser';
import UserUpdateRoutes from './routes/users/updateForUser';
import AdminVendorRoutes from './routes/admin/vendors';

import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

// api
app.use(express.json());

app.use('/api', apiRouter);
app.use('/api/vendors/get', vendorGetRoutes);
app.use('/api/vendors/post', vendorPostRoutes);
app.use('/api/vendors/update', vendorUpdateRoutes);
app.use('/api/users/get', UserGetRoutes);
app.use('/api/users/post', UserPostRoutes);
app.use('/api/users/update', UserUpdateRoutes);
app.use('/api/admin/vendors', AdminVendorRoutes);

// websockets
const server = createServer(app);
setupWebSockets(server);

connectMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
