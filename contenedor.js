//importaciones
const {promises: fs} = require ('fs')
const {send} = require ('express')

//instancias
class Contenedor {
    constructor(route) {
        this.route = route
    }
    async getAll(req,res){
        try {
            const content = JSON.parse(await fs.readFile(`./${this.route}`,'utf-8'))
            res.send (content)
        } catch (error) {
            res.send(error)
        }
    }
    async deleteById (id) {
        try {
            const content = JSON.parse(await fs.readFile(`./${this.route}`,'utf-8'))
            const elementosFiltrados = content.filter(e => e.id !== id)
            await fs.writeFile(`./${this.route}`,JSON.stringify(elementosFiltrados, null, 2))
            console.log(elementosFiltrados)
            console.log(content)
        } catch (error) {
            console.log(error)
        }
    }
    async save(req,res,obj) {
            const productos = await this.getAll()
            let newId;
            if(productos.length == 0){
                newId = 1;
            }else {
                newId = productos[productos.length - 1].id + 1;
            }
            const newObj = {...obj, id: newId}
            productos.push(newObj);
            try {
                await fs.writeFile(`./${this.route}`,JSON.stringify(productos, null, 2))
                res.send(newObj)
            } catch (error) {
                res.send(error)
            }
    }
    async getById(req,res,id){
        try {
            const content = JSON.parse(await fs.readFile(`./${this.route}`,'utf-8'))
            const elementosFiltrados = content.filter(e => e.id === (parseint(id)))
            console.log(elementosFiltrados)
            if (elementosFiltrados.length === 0){
                res.send ( {error:'no se encontro el producto'})
            } else {
                res.send (elementosFiltrados)
            }
        } catch (error) {
            res.send(error)
            null
        }
    }
    async deleteAll(){
        try {
            await fs.writeFile(`./${this.route}`,JSON.stringify([], null, 2))
            const content = JSON.parse(await fs.readFile(`./${this.route}`,'utf-8'))
            console.log(content)
        } catch (error) {
            console.log(error)
            return "no pudo eliminarse"
        }
    }
}




module.exports = Contenedor;