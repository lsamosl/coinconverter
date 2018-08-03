import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Picker,
  TextInput,
  Button,
  Modal
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
//import ValidationComponent from 'react-native-form-validator'
import { MxnToUsd, UsdToMxn, labelMxnToUsd, labelUsdToMxn } from './Constantes'
import {getCurrency} from './Servicios/Convertidor'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currencyType: MxnToUsd,
      amount: 0,
      labelAmount: labelMxnToUsd,
      amountConvert : 0
    }
  }

  onChangeConverterType = (itemValue, itemIndex) => {   
    this.setState(
      {
        currencyType: itemValue,
        amountConvert: 0
      }, () => 
      {
        this.updateLabelAmount();
      }
    );
  }

  updateLabelAmount = () => {
    let label = labelMxnToUsd;
     if(this.state.currencyType === UsdToMxn){
      label= labelUsdToMxn;
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

  updateAmountConvert = (value) => {
    this.setState({
      amountConvert: value
    });
  }

  calcular = () => {
    getCurrency(this.state.currencyType, this.state.amount, MxnToUsd, this.updateAmountConvert);
  }

  render() {
    return (
      <View style={styles.container}>

        <Text>
          Importe
        </Text>
        <TextInput onChangeText = {(value) => {this.onChangeAmount(value)}}
                   keyboardType='numeric'/>

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
        <TextInput editable={false} >
          {this.state.amountConvert}
        </TextInput>

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
