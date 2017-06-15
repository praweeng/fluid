import React from 'react';
import { connect } from 'react-redux';
import {Text, Subtitle, View, Tile, Divider, Image } from '@shoutem/ui';
import { ScrollDriver, ZoomOut } from '@shoutem/animation';
import { styleSheet, TouchableWithoutFeedback, LayoutAnimation, UIManager  } from 'react-native';
import * as actions from '../actions';

class ListItem extends React.Component {

    componentWillUpdate() {
         UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    renderDescription() {
        const { expanded, library } = this.props;

        if (expanded) {
            return (
                <Subtitle styleName="sm-gutter-horizontal">{library.decscription}</Subtitle>
            );
        }
    }

    render() {

        const { id, title, decscription, image } = this.props.library;
        const driver = new ScrollDriver();

        return(
         <TouchableWithoutFeedback
         onPress={() => this.props.selectLibrary(id)}
         >
           <View>
               <Image
                    styleName="large-banner"
                    source={{ uri: image.url }}
                >
                 <Tile>
                    <Text styleName="md-gutter-bottom">{title}</Text>
                        { this.renderDescription()}
                </Tile>
                 </Image>
                <Divider styleName="line" />
          </View>
          </TouchableWithoutFeedback>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
       const expanded = state.selectedLibraryId === ownProps.library.id;
        return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);