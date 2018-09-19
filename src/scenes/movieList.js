import React from 'react';
import { FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import { movieListSelector } from 'src/data/selectors';
import Swipeout from 'react-native-swipeout';
import { Text, ListItem, Body, Left, Thumbnail, Right, Button } from 'native-base';
import * as ActionTypes from 'src/data/actionTypes';


class MovieList extends React.Component {
  deleteMovie = (item) => {
    Alert.alert(
      'Are you sure to delete this?',
      '',
      [
        { text: 'Cancel' },
        {
          text: 'Sure',
          onPress: () => {
            const { dispatch } = this.props.navigation;
            const { id } = item;
            dispatch({ type: ActionTypes.DELETE_MOVIE, id });
          }
        }
      ]
    );
  }

  editMovie = (item) => {
    const { navigate } = this.props.navigation;
    navigate({
      routeName: 'editMovie',
      // Selectors will using id from params to bind the orm instance
      params: item });
  }

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;
    const swipeBtns = [
      {
        text: 'Edit',
        type: 'primary',
        onPress: () => this.editMovie(item) },
      {
        text: 'Delete',
        type: 'delete',
        onPress: () => this.deleteMovie(item)
      }
    ];

    return (
      <Swipeout
        right={swipeBtns}
        autoClose
        backgroundColor="transparent"
      >

        <ListItem thumbnail>
          <Left>
            <Thumbnail square source={{ uri: item.imageUrl }} />
          </Left>
          <Body>
            <Text>{item.title}</Text>
            <Text note numberOfLines={2}>{item.description}</Text>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                navigate({
                  key: `movieDetail-${item.id}`,
                  routeName: 'movieDetail',
                // Selectors will using id from params to bind the orm instance
                  params: item });
              }}
            >
              <Text>View</Text>
            </Button>
          </Right>
        </ListItem>
      </Swipeout>
    );
  };
  render() {
    return (
      <FlatList
        // Use data from selector to render the list
        data={this.props.data}
        renderItem={this.renderItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    // Bind with selector
    data: movieListSelector(state, ownProps)
  };
}

export default connect(mapStateToProps)(MovieList);
