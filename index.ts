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
  if(typeof Object.values(argumentos)[0] !== "boolean"){
    (typeof Object.values(argumentos)[0] == "number") ? parametro = Object.values(argumentos)[0]
    :(Object.values(argumentos)[0].includes('{"name":') * Object?.values(argumentos)[0].includes('"id":'))
    ? parametro = new Product(JSON.parse(Object.values(argumentos)[0]).name,JSON.parse(Object.values(argumentos)[0]).id)
    :parametro = undefined;
  }

  return {
    action: accion,
    param: parametro
  }
}

function main() {
  const argumentos = parsearArgv(process.argv);
  const controlador = new ProductController();
  const resultado = controlador.processOptions(argumentos.action,argumentos.param);
  if (resultado) {
    console.log(resultado)
} else {
  console.log(`Se guardo el producto`, argumentos.param)
}
}

main();