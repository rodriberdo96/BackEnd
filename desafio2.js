const {promises: fs} = require ('fs')

class Contenedor {
    constructor(route) {
        this.route = route
    }
    async getAll(){
        try {
            const content = JSON.parse(await fs.readFile(`./${this.route}`,'utf-8'))
            return content
        } catch (error) {
            console.log(error)
            return []
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
    async save(obj) {
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
                console.log(productos)
            } catch (error) {
                console.log(error)
            }
    }
    async getById(id){
        try {
            const content = JSON.parse(await fs.readFile(`./${this.route}`,'utf-8'))
            const elementosFiltrados = content.filter(e => e.id === id)
            console.log(elementosFiltrados)
        } catch (error) {
            console.log(error)
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

module.exports = Contenedor

module.exports = Contenedor;