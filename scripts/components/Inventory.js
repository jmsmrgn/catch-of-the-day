/*
  Inventory
*/
import React from 'react';
import AddFishForm from './AddFishForm';
import autobind from 'autobind-decorator';

@autobind
class Inventory extends React.Component {
  renderInventory(key) {
    var linkState = this.props.linkState;

    return (
      <div className="fish-edit" key={key}>
        <input type="text" valueLink={linkState('fishes.' + key + '.name')} />
        <input type="text" valueLink={linkState('fishes.' + key + '.price')} />
        <input type="text" valueLink={linkState('fishes.' + key + '.desc')} />
        <select valueLink={linkState('fishes.' + key + '.status')}>
          <option value="unavailable">Sold out!</option>
          <option value="available">Fresh!</option>
        </select>
        <textarea valueLink={linkState('fishes.' + key + '.desc')}></textarea>
        <input type="text" valueLink={linkState('fishes.' + key + '.image')} />
        <button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Inventory</h1>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm {...this.props} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
};

Inventory.propTypes = {
  removeFish: React.PropTypes.func.isRequired,
  linkState: React.PropTypes.func.isRequired,
  fishes: React.PropTypes.object.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired
}

export default Inventory;
