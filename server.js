//importaciones
const express = require('express');
const Contenedor=  require ('./contenedor.js');
const {router} = express

//instancias
const routerProductos =  new Router();
const app = express();


//config del puerto
const PORT = 8080;


//middlewares
routerProductos.use (express.json());
routerProductos.use (express.urlencoded({extended: true}));
app.use('/api/productos', routerProductos);
express.static ('public');
const productos= new Contenedor('productos.json');


//rutas

routerProductos.get('/productos', async (req, res,next) => {
    const productos = await productos.getAll();
    res.json(productos);
});

routerProductos.get('/productos/:id', async (req, res,next) => {
    const producto = await productos.getById(req.params.id);
    if(producto.length ===0){
        const error= res.status(404).json({error: 'producto no encontrado'}) 
        return next (error)
    }
    res.json(producto);
});

routerProductos.post('/productos', async (req, res) => {
    const producto = await productos.save(req.body);
    producto.push (producto);
    res.json(producto);
});

routerProductos.put('/productos/:id', async (req, res) => {
    const {id} = req.params;
    const {title, price, thumbnail} = req.body;
    const producto = await productos.updateById(id, {title, price, thumbnail});
    const productoActualizado = await productos.getById(parseint(id));
    res.json(productoActualizado);
    res.json(producto);
});

routerProductos.delete('/productos/:id', async (req, res) => {
    const producto = await productos.deleteById(req.params.id);
    res.json(producto);
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

//levantar servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: http://localhost:${PORT}`);
});

server.on('error', error => {
    console.log('Error en servidor ',error);
});
