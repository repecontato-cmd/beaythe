import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes.js';
import seoRoutes from './routes/seo.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import './cron/stockSync.js'; // Start cron jobs

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api/products', productRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Admin Core Sys Backend is running.' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server ready at http://0.0.0.0:${PORT}`);
});
