import * as minimist from 'minimist';
import {ProductController} from './controller';
import {Product} from './models';

function parsearArgv(argv){
  const argumentos = minimist(argv.slice(2));
  delete argumentos._

  var accion: "get" | "add" | "search";
  (argumentos.get) ? accion = "get"
  :(argumentos.search) ? accion = "search"
  :(argumentos.add) ? accion = "add"
  :accion = undefined;

  var parametro: "number" | Product;
  const param: "number" | "string" | "boolean" = Object.values(argumentos)[0];
  if(typeof param !== "boolean"){
    (typeof param == "number") ? parametro = param
    :(param.includes('{"name":') && param.includes('"id":'))
    ? parametro = new Product(JSON.parse(param).name,JSON.parse(param).id)
    :parametro = undefined;
  }

  return {
    action: accion,
    param: parametro
  }
}

async function main() {
  const argumentos = parsearArgv(process.argv);
  const controlador = new ProductController();
  const resultado = await controlador.processOptions(argumentos.action,argumentos.param)
    if (resultado) {
     console.log(resultado);
    } else {
     console.log(`Se guardo el producto`, argumentos.param);
    }
  
}

main();