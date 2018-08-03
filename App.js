import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Picker,
  TextInput,
  Button
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { MxnToUsd, UsdToMxn, labelMxnToUsd, labelUsdToMxn } from './Constantes'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currencyType: MxnToUsd,
      amount: 0,
      labelAmount: labelMxnToUsd
    }
  }


  onChangeConverterType = (itemValue, itemIndex) => {   
    this.setState(
      {
        currencyType: itemValue
      }, () => 
      {
        this.updateLabelAmount();
      }
    );
  }

  updateLabelAmount = () => {
    console.log(" this.state.currencyType: ");
    const label = labelMxnToUsd;
     if(this.state.currencyType == UsdToMxn){
      label: labelUsdToMxn;
    }
    
    this.setState( 
      {
        labelAmount: label
      }
    );
  }

  onChangeAmount = (value) =>{
    this.setState({
      amount: value
    });
  }

  calcular = () => {
    console.log("Consumo de API");
  }

  render() {
    return (
      <View style={styles.container}>

        <Text>
          Importe
        </Text>
        <TextInput onChangeText = {(value) => {this.onChangeAmount(value)}}/>

        <Text>
          Tipo de conversion
        </Text>
        <Picker selectedValue={this.state.currencyType}
                onValueChange={(itemValue, itemIndex) => {this.onChangeConverterType(itemValue, itemIndex);}}>
                <Picker.Item label="MXN -> USD" value={MxnToUsd} />
                <Picker.Item label="USD -> MXN" value={UsdToMxn}/> 
        </Picker>

        <Button title="Convertir"
                onPress={() => this.calcular()}/>

        <Text  />  

        <Text/>
        <Text/>
        <Text/>

        <Text>
          {this.state.labelAmount}
        </Text>      
        <TextInput editable={false} />

      </View>
    );
  }

  componentDidMount() {
      SplashScreen.hide();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 16,
  },
});
