import React from 'react';

// stateless functional component is used instead of class App extends React.Component {render() {}} when this is the only functionality
// = () => same as function() {}
const Header = (props) => {
  return(
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Day
      </h1>
      <h3 className="tagline"><span>{props.tagline}</span></h3>
    </header>
  )
}

export default Header;
