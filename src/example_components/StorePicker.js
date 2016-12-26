import React from 'react';
import { getFunName } from '../helpers'

// Each component needs a file
class StorePicker extends React.Component {
  // When you need to use methods more than once, use this way for this to be = to StorePicker:
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }

  // Another way: this.goToStore.bind(this), also: onSubmit={(e) => this.goToStore(e)}

  goToStore(event) {
    event.preventDefault();
    // first grab text from the box
    const storeId = this.storeInput.value;
    // transition from / to /store/:storeId (To Change Pages)
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
      // in React, class doesn't work, you've to say className.
      // On submit doesnt take () because we dont want this to happen right away
      <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
        { /* this is a comment in React */ }
        <h2>Please Enter A Store</h2>
        { /* Put a reference into the input class that comes from the getFunName function */ }
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input}} />
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

// Tell React that the StorePicker component expects a router
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
