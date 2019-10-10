import React, { Component } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import uuid from 'uuid';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      id: uuid(),
      item: '',
      editItem: false
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      item: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.item.trim()) return;

    let newItem = {
      id: this.state.id,
      title: this.state.item
    };

    let updatedItems = [...this.state.items, newItem];

    this.setState({
      items: updatedItems,
      item: '',
      id: uuid(),
      editItem: false
    });
  };

  clearList = () => {
    this.setState({
      items: []
    });
  };

  handleDelete = (id) => {
    let filteredItems = this.state.items.filter((item) => item.id !== id);
    this.setState({
      items: filteredItems
    });
  };

  handleEdit = (id) => {
    let filteredItems = this.state.items.filter((item) => item.id !== id);

    let selectedItem = this.state.items.find((item) => item.id === id);

    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      editItem: true,
      id: id
    });
  };

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-5 mx-auto col-md-8 mt-4'>
            <h3 className='text-capitalize text-center'>Your Daily Works </h3>
            <TodoInput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={this.state.editItem}
            />
            <TodoList
              items={this.state.items}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
