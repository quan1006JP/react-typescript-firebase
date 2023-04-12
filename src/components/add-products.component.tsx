import { Component, ChangeEvent } from "react";
import ProductsDataService from "../services/products.services";
import ProductsData from '../types/products.type';

type Props = {};

type State = ProductsData & {
  submitted: boolean
};

export default class AddProducts extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.saveProducts = this.saveProducts.bind(this);
    this.newProducts = this.newProducts.bind(this);

    this.state = {
      name: "",
      description: "",
      price: "",
      published: false,

      submitted: false,
    };
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangePrice(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      price: e.target.value,
    });
  }

  saveProducts() {
    let data = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      published: false
    };

    ProductsDataService.create(data)
      .then(() => {
        console.log("Created new item successfully!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newProducts() {
    this.setState({
      name: "",
      description: "",
      price: "",
      published: false,

      submitted: false,
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newProducts}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  required
                  value={this.state.price}
                  onChange={this.onChangePrice}
                  name="price"
                />
              </div>
  
              <button onClick={this.saveProducts} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  
   }
}
