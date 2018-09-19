import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {
    Button, Text, Footer, FooterTab
  } from 'native-base';

export default class TabHeader extends React.PureComponent {
  render() {
    const props = this.props;
    const { index } = props.navigation.state;
    return (
      <Footer>
        <FooterTab>
          <Button
            vertical active={index === 0}
            onPress={() => props.navigation.navigate('movieNav')}
          >
            <MaterialCommunityIcons
              color={index === 0 ? 'white' : 'lightgray'} size={20} name="movie"
            />
            <Text>Movies</Text>
          </Button>
          <Button
            vertical active={index === 1}
            onPress={() => props.navigation.navigate('commentNav')}
          >
            <MaterialCommunityIcons
              color={index === 1 ? 'white' : 'lightgray'} size={20} name="comment-multiple-outline"
            />
            <Text>Comments</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
  }

