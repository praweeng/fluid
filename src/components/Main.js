import React from 'react';
import { ListView } from '@shoutem/ui';
import { connect } from 'react-redux';
import ListItem from './ListItem'

class Main extends React.Component {
   constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.state = {
      libraries: this.props.libraries,
    }
  }

    
    renderRow(library) {
       return <ListItem library={library} />;
    }

    render() {
        return(
                    <ListView
                    data={this.state.libraries}
                    renderRow={this.renderRow}
                    />
        );
    }
}

const mapStateToProps = state => {
   return { libraries: state.libraries };
};

export default connect(mapStateToProps)(Main);