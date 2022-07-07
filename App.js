import React, { useState, useEffect, Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  CheckBox,
  Button,
  Modal,
  SafeAreaView,
  TextInput,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Constants from 'expo-constants';
import AssetExample from './components/AssetExample';
import { Card } from 'react-native-paper';
import { Audio } from 'expo-av';
import effect from './assets/click_sound';


const data = [
  { id: 1, isChecked: false ,},
  { id: 2, isChecked: false },
  { id: 3, txt: 'Nice!', isChecked: false },
  { id: 4, isChecked: false },
  { id: 5, txt: 'Amazing!', isChecked: false },
  { id: 6, isChecked: false },
  { id: 7, isChecked: false },
  { id: 8, isChecked: false },
  { id: 9, txt: 'Slow down fast fingers!', isChecked: false },
  { id: 10, isChecked: false },
  { id: 11, txt: 'On a streak!', isChecked: false },
  { id: 12, isChecked: false },
  { id: 13, txt: 'Almost there!', isChecked: false },
  { id: 14, isChecked: false },
  { id: 15, txt: 'Good job!', isChecked: false,},
];
var countVal = 0;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      counter: 0,
      products: data,
      stop: false,
      check : true,
    };
  }

  startTimer = () => {
    let timer = setInterval(this.manageTimer, 1000);
    this.setState({ timer });
  };

  

  manageTimer = () => {
    var states = this.state;

    if (states.counter === 60) {
      alert('Times Up!\nTimer has been reset');
      clearInterval(this.state.timer);
      this.setState({
        counter: 0,
      });
    } else if (countVal === 15) {
      var finalTime = this.state.counter;
      alert('Final Time  : ' + finalTime + ' seconds');
      clearInterval(this.state.timer);
      this.setState({
        counter: 0,
        check : false,
      });
    } else {
      this.setState({
        counter: this.state.counter + 1,
      });
    }
  };

    playSound = async () => {
      await Audio.Sound.createAsync(
        {uri:effect},
        {shouldPlay:true}
      )
  };

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  handleChange = (id) => {
    let temp = this.state.products.map((product) => {
      if (id === product.id) {
         return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    this.setState({
      products: temp,
    });
  };

  renderFlatList = (renderData) => {
    return (
      <SafeAreaView>
        <ImageBackground
          // source={require('./assets/background-checkbox.png')}
          style={styles.backgroundImage}>
          <Text style={{ textAlign: 'center', marginVertical: 20 }}>
            {this.state.counter}
          </Text>
          <View>
            <Button title="START GAME" onPress={() => this.startTimer()} />
          </View>

          <FlatList
            data={renderData}
            renderItem={({ item }) => (
              <Card style={{ margin: 5 }}>

                <View style={ this.state.check ? styles.cardunChecked : styles.cardChecked}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'space-between',
                    }}>
                    <CheckBox
                      value={item.isChecked}
                      onChange={() => {
                        this.handleChange(item.id);
                        countVal++;       
                        this.playSound()         
                      }}
                    />
                    <Text>{item.txt}</Text>
                  </View>
                </View>
              </Card>
            )}
          />
        </ImageBackground>
      </SafeAreaView>
    );
  };

  render() {
    //let selected = this.state.products?.filter((product) => product.isChecked);
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {this.renderFlatList(this.state.products)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  cardunChecked: {
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "crimson",
  },

  cardChecked: {
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "lime",
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'lightblue',
  },
});
