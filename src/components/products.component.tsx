import { Component, ChangeEvent } from "react";

import ProductsDataService from "../services/products.services";
import ProductsData from "../types/products.type";

type Props = {
  products: ProductsData,
  refreshList: Function
};

type State = {
  currentProducts: ProductsData;
  message: string;
}

export default class Products extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateProducts = this.updateProducts.bind(this);
    this.deleteProducts = this.deleteProducts.bind(this);

    this.state = {
      currentProducts: {
        key: null,
        name: "",
        description: "",
        price: "",
        published: false,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { products } = nextProps;
    if (prevState.currentProducts.key !== products.key) {
      return {
        currentProducts: products,
        message: ""
      };
    }

    return prevState.currentProducts;
  }

  componentDidMount() {
    this.setState({
      currentProducts: this.props.products,
    });
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;

    this.setState(function (prevState: State) {
      return {
        currentProducts: {
          ...prevState.currentProducts,
          name: name,
        },
      };
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentProducts: {
        ...prevState.currentProducts,
        description: description,
      },
    }));
  }

  onChangePrice(e: ChangeEvent<HTMLInputElement>) {
    const price = e.target.value;

    this.setState((prevState) => ({
      currentProducts: {
        ...prevState.currentProducts,
        price: price,
      },
    }));
  }

  updatePublished(status: boolean) {
    if (this.state.currentProducts.key) {
      ProductsDataService.update(this.state.currentProducts.key, {
        published: status,
      })
        .then(() => {
          this.setState((prevState) => ({
            currentProducts: {
              ...prevState.currentProducts,
              published: status,
            },
            message: "The status was updated successfully!",
          }));
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }

  updateProducts() {
    if (this.state.currentProducts.key) {
      const data = {
        name: this.state.currentProducts.name,
        description: this.state.currentProducts.description,
      };

      ProductsDataService.update(this.state.currentProducts.key, data)
        .then(() => {
          this.setState({
            message: "The products was updated successfully!",
          });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }

  deleteProducts() {
    if (this.state.currentProducts.key) {
      ProductsDataService.delete(this.state.currentProducts.key)
        .then(() => {
          this.props.refreshList();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }

  render() {
    const { currentProducts } = this.state;

    return (
      <div>
        <h4>Products</h4>
        {currentProducts ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentProducts.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentProducts.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={currentProducts.price}
                  onChange={this.onChangePrice}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentProducts.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentProducts.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProducts}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProducts}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Products...</p>
          </div>
        )}
      </div>
    );

  }
}
