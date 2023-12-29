const fs = require('fs')



//Creacion de la clase de productos
class ProductManager{
    constructor (){
        this.products = []
        this.id = 1
        this.path = './products.json'
    }
    
    // Creacion de array de productos vacio
    // products = []

    // Metodo para obtener productos
    getProducts() {
        fs.promises.readFile(this.path, 'utf-8')
        .then(data => {
          this.products = JSON.parse(data);
          console.log(this.products);
        })
        .catch(err => `Catastrofe mal :( : ${err}`);
    }

    // Metodo para obtener productos por ID
    getProductsId(id) {(
            async () => {
              try {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                this.products = JSON.parse(data);
                const element = this.products.find(e => e.id === id);
                if (element){
                  console.log(element);
                } else {
                  console.log(`No se encontro el producto que buscabas ${id}`);
                }
              } catch(err) {
                  console.log(`Erro error erorr eorr: ${err}`);
              }
            }
          )();
    }

    //Metodo para agregar productos
    addProduct(product) {(

        async () => {
        // Validar campos vacios
        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
            console.error('Faltan datos, los campos deben estar completos')
            return 
        }else {
        let punto = true;
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
            do { 
              if (!this.products.some(prod => prod.id === this.productId)) {
                // Validacion de ID distinto
                punto = false;
                if (!this.products.some(prod => prod.code === code)){
                  const product = { id: this.productId, title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock};
                  this.products.push(product);
                  save(this.path, this.products);
      
                } else {
                  console.log(`Ya hay un producto con el codigo ${code}`);
                }
              } else {
                this.productId += 1;
              }
            } while (punto)
          } catch(err) {
            console.log(`Hubo un error: ${err}`);
          }
        }
        }
        )();
    }



updateProduct(id, title, description, price, thumbnail, code, stock) {
    // Método para actualizar 
    (
      async () => {
        try {
          const data = await fs.promises.readFile(this.path, 'utf-8');
          this.products = JSON.parse(data);
          const element = this.products.find(e => e.id === id);
          if (element){
            this.products.map((item) => {
              if(item.id === element.id){
                if (!title || !description || !price || !thumbnail || !code || !stock){
                  // Validacion de campos vacios
                  console.log("Se deben completar todos los campos!");
                } else {
                  item.title = title;
                  item.description = description;
                  item.price = price;
                  item.thumbnail = thumbnail;
                  item.code = code;
                  item.stock = stock;

                  save(this.path, this.products);

                }
              }
            })
            
          } else {
            console.log(`No se encontro ningun producto con este ID ${id}`);
          }
        } catch(err) {
            console.log(`Eror rroe errorr: ${err}`);
        }
      }
    )()
  }


  deleteProduct(id) {
    // Metodo para eliminar un producto
    (
      async () => {
        try {

          const data = await fs.promises.readFile(this.path, 'utf-8');
          this.products = JSON.parse(data);
          const element = this.products.find(e => e.id === id);

          if (element){
            const eIndex = this.products.indexOf(element);
            this.products.splice(eIndex, 1);

            fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf-8')
              .then(res => {
                console.log("El item ha sido eliminado en forma exitosa");
              })
              .catch(err => {
                console.log(`Erro roer errorr: ${err}`);
              })
          } else {
            console.log(`No hay productos con este ID ${id}`);
          }
        } catch(err) {
            console.log(`Errorr erorr roreer: ${err}`);
        }
      }
    )()
  }
}

function save(param_path, param_products) {
    fs.promises.writeFile(param_path, JSON.stringify(param_products), 'utf-8')
      .then(res => {
        console.log("Producto guardado correctamente");
      })
      .catch(err => {
        console.log(`Hubo un error: ${err}`);
      })
  }


const bd = new ProductManager()



// FUncion para "carga" de productos
bd.addProduct({
    title: 'Manzana',
    description: 'Manzana roja grande',
    price: 1500,
    thumbnail: '../archivo1.jpg',
    code: codeGenerator(),
    stock: 50
})
bd.addProduct({
    title: 'Pera',
    description: 'Pera de Israel',
    price: 1200,
    thumbnail: '../archivo2.jpg',
    code: codeGenerator(),
    stock: 38
})
bd.addProduct({
    title: 'Uva',
    description: 'Uva blanca',
    price: 1800,
    thumbnail: '../archivo3.jpg',
    code: codeGenerator(),
    stock: 78
})


// Mostrar todos array completo
const listProducts = bd.getProducts();
console.log('-----Listado completo de productos-----', listProducts);

// Actualizar producto
pm.updateProduct(2, 'Pera', 'Pera de Argentina', 34, '../archivo2.jpg', eiu423, 4);

// Mostrar un producto buscado por id
const productId = bd.getProductsId(3);
console.log('-----Producto buscado por ID-----', productId);

function codeGenerator (){
let code = Math.random().toString(36).substring(3, 9)

return code
}
