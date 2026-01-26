import express from 'express'
const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.get('/', (req, res) => {
    app.status(400).json({ message: `Server is up and running`})
});

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`)
});