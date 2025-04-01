import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

// Setup for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse raw XML as text
app.use(express.text({ type: 'text/xml' }));

// POST endpoint that mimics SOAP behavior
app.post('/services/hp_admin/EPP/EnterpriseProfilesPreferencesService/v3', (req, res) => {
  console.log('SOAP Request Received:\n', req.body);

  const xmlResponse = fs.readFileSync(path.join(__dirname, 'soap-response.xml'), 'utf-8');
  res.set('Content-Type', 'text/xml');
  res.status(200).send(xmlResponse);
});

app.listen(port, () => {
  console.log(`SOAP mock server running at http://localhost:${port}`);
});
