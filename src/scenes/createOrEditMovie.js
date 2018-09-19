import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Container, Content, Form, Item, Input, Label, Text, Button
} from 'native-base';
import { NavigationActions } from 'react-navigation';

import * as ActionTypes from 'src/data/actionTypes';

import orm from 'src/data';
import { getState } from 'src/storeHelper';


export default class createOrEditMovie extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      title: '',
      imageUrl: '',
      description: ''
    };
  }

  componentWillMount = () => {
    const { navigation } = this.props;
    const dbState = getState().data;
    const sess = orm.session(dbState);

    const movieID = navigation.getParam('id');
    if ((movieID || movieID === 0) && sess.Movie.idExists(movieID)) {
      const movie = sess.Movie.withId(movieID);
      const { id, title, imageUrl, description } = movie.ref;
      this.setState({ id, title, imageUrl, description });
    }
  }

  save = () => {
    const { dispatch } = this.props.navigation;
    const movie = Object.assign({}, this.state);
    if (!movie.id && movie.id !== 0) {
      delete movie.id;
    }
    dispatch({
      type: ActionTypes.CREATE_OR_UPDATE_MOVIE, movie });
    dispatch(NavigationActions.back());
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Item stackedLabel>
              <Label>Title</Label>
              <Input
                value={this.state.title}
                onChangeText={title => this.setState({ title })}
              />
            </Item>
            <Item stackedLabel>
              <Label>Image Link</Label>
              <Input
                value={this.state.imageUrl}
                onChangeText={imageUrl => this.setState({ imageUrl })}
              />
            </Item>
            <Item stackedLabel>
              <Label>Descrption</Label>
              <Input
                value={this.state.description}
                onChangeText={description => this.setState({ description })}
                multiline
              />
            </Item>
          </Form>
          <View style={{ marginLeft: 15, paddingTop: 15 }}>
            <Button
              primary
              onPress={this.save}
            >
              <Text>Save</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
