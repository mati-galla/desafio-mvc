import * as js from 'jsonfile';

class Product{
  constructor(name: string, id: number){
    this.name = name;
    this.id = id;
  }
  
  name!: string;
  id!: number;
}

class ProductsCollection{ 
  data: Product[] = [];

  async load(){
    this.data = await js.readFile(__dirname + '/productos.json')
  }

  async add(prod: Product | Product[]){
    (Array.isArray(prod))
    ? this.data = this.data.concat(prod)
    : this.data.push(prod);
    await js.writeFile(__dirname + '/productos.json',this.data);
  }

  getAll(){
    return this.data;
  }

  getOneById(id: number){
    return this.data.find(e => e.id == id);
  }
}

export {Product,ProductsCollection};
