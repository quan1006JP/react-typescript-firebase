import firebase from "../firebase";
import ProductsData from "../types/products.type"

const db = firebase.ref("/products");

class ProductsDataService {
  getAll() {
    return db;
  }

  create(products: ProductsData) {
    return db.push(products);
  }

  update(key: string, value: any) {
    return db.child(key).update(value);
  }

  delete(key: string) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductsDataService();