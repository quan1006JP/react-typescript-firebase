import { Component } from "react";
import ProductDataService from "../services/products.services";
import Product from "./products.component";
import ProductData from '../types/products.type';

type Props = {};

type State = {
  products: Array<ProductData>,
  currentProduct: ProductData | null,
  currentIndex: number
};

export default class ProductsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduct = this.setActiveProduct.bind(this);
    this.removeAllProducts = this.removeAllProducts.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      products: [],
      currentProduct: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    ProductDataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    ProductDataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items: any) {
    let products = new Array<ProductData>();

    items.forEach((item: any) => {
      let key = item.key;
      let data = item.val();
      products.push({
        key: key,
        name: data.name,
        description: data.description,
        price: data.price,
        published: data.published,
      });
    });

    this.setState({
      products: products,
    });
  }

  refreshList() {
    this.setState({
      currentProduct: null,
      currentIndex: -1,
    });
  }

  setActiveProduct(product: ProductData, index: number) {
    this.setState({
      currentProduct: product,
      currentIndex: index,
    });
  }

  removeAllProducts() {
    ProductDataService.deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { products, currentProduct, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Products List</h4>

          <ul className="list-group">
            {products &&
              products.map((product, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveProduct(product, index)}
                  key={index}
                >
                  {product.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProducts}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentProduct ? (
            <Product
              products={currentProduct}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on a Product...</p>
            </div>
          )}
        </div>
      </div>
    );

  }
}
