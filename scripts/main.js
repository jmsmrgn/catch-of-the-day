var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');

/*
  App
*/
var App = React.createClass({
  getInitialState() {
    return {
      fishes: {},
      order: {}
    }
  },

  addFish(fish) {
    var timestamp = (new Date()).getTime();
    // update the state object
    this.state.fishes['fish-' + timestamp] = fish;
    // set the state
    this.setState({fishes: this.state.fishes});
  },

  loadSamples() {
    this.setState({
      fishes: require('./sample-fishes')
    });
  },

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" num="5000" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
});


/*
  Add Fish Form
  <AddFishForm/>
*/
var AddFishForm = React.createClass({
  createFish(event) {
    // stop from from submitting
    event.preventDefault();
    // take data from form and create object
    var fish = {
      name: this.refs.name.value,
      price: this.refs.price.value,
      status: this.refs.status.value,
      desc: this.refs.desc.value,
      image: this.refs.image.value
    };
    // add fish to the app state
    this.props.addFish(fish);
    this.refs.fishForm.reset();
  },

  render() {
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name" />
        <input type="text" ref="price" placeholder="Fish Price" />
        <select ref="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to Image" />
        <button type="submit">+ Add Item </button>
      </form>
    )
  }
});


/*
  Header
*/
var Header = React.createClass({
  render() {
    console.log(this.props)
    return (
      <header className="top">
        <h1>Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
});


/*
  Order
*/
var Order = React.createClass({
  render() {
    return (
      <p>Order</p>
    )
  }
});


/*
  Inventory
*/
var Inventory = React.createClass({
  render() {
    return (
      <div>
        <h1>Inventory</h1>
        <AddFishForm {...this.props} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
});


/*
  StorePicker
*/
var StorePicker = React.createClass({
  mixins : [History],
  goToStore(event) {
    event.preventDefault();
    // get the data from the input
    var storeId = this.refs.storeId.value;
    // transition from <StorePicker/> to <App/>
    this.history.pushState(null, '/store/' + storeId);
  },

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        <input type="text" ref="storeId" required defaultValue={h.getFunName()}/>
        <input type="Submit"/>
      </form>
    )
  }
});


/*
  Not Found
*/
var NotFound = React.createClass({
  render() {
    return (
      <h1>Not Found</h1>
    )
  }
});

/*
  Routes
*/
var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));
