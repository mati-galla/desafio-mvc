import {Product, ProductsCollection} from './models';

class ProductController{
  constructor(){
    this.products = new ProductsCollection();
    this.promesa = this.products.load();
  }

  products: ProductsCollection;
  promesa: Promise<any>;

  processOptions(action: "get" | "search" | "add", param: "number" | Product){
    return this.promesa.then(() => {
      var resultado;
      var err: boolean = false;
      switch (action) {
        case "get":
          resultado = this.products.getAll();
        break;
        case 'search':
          (typeof param == "number")
          ? resultado = this.products.getOneById(param)
          :(console.error('No se precisó el número de ID a buscar'), err = true);
        break;
        case 'add':
          (param instanceof Product)
          ? resultado = this.products.add(param)
          :(console.error('No se precisó el producto a agregar'), err = true);
        break;
        case undefined:
          console.error('No se precisó la acción a realizar');
          err = true;
        break;
      }
       if(err == true) throw Error(); 
       return resultado;
    });
    }
  }  

  export{ProductController}
