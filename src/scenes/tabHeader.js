import React from 'react';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import {
    Button, Left, Body, Right, Title, Header
  } from 'native-base';
import {
    DrawerActions, NavigationActions
  } from 'react-navigation';

export default class TabHeader extends React.PureComponent {
  render() {
    const props = this.props;
    return (
      <Header>
        <Left>
          { props.navigation.state.index > 0 ? (
            <Button
              transparent
              onPress={() => props.navigation.dispatch(NavigationActions.back())}
            >
              <MaterialIcons
                color="white" size={20} name="arrow-back"
              />
            </Button>) : (
            <Button
              transparent
              onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
            >
              <MaterialIcons
                color="white" size={20} name="menu"
              />
            </Button>)}

        </Left>
        <Body style={{ height: 45, flexDirection: 'row', alignItems: 'center' }}>
          <Title>{this.props.title || 'Movie Fan'}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
  }

