import express from 'express';
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('🚀 Version 3 deployed');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT,()=>{
 console.log(`Server running on port ${PORT}`);
})
