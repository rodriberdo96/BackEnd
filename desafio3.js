const express = require('express');
const Contenedor=  require ('./desafio2.js');
const app = express();
const PORT = 8080;
const productos= new Contenedor('productos.json');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('Error en servidor ',error);
});

app.get('/productos', async (req,res) => {
    const products= await productos.getAll();
        res.send (products);
});

app.get('/productosRandom',  async (req,res) => {
    const products = await productos.getAll();
        const random = parseInt(Math.random() * products.length);
        console.log(random)
        res.send(products[random]);
});
