import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Web3 from 'web3';
const INFURA_ACCESS_TOKEN = 'YOUR_INFURA_ACCESS_TOKEN';

const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/${ INFURA_ACCESS_TOKEN }`));

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      privateKey: '',
      account: {},
      balance: 0,
    }
  }

  getValidKey = privateKey => {
    return privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
  };

  getAccountOnPrivateKey = privateKey => {
    const validPrivateKey = this.getValidKey(privateKey);
    const account = web3.eth.accounts.privateKeyToAccount(validPrivateKey)
    web3.eth.getBalance(account.address).then(balance => this.setState({balance}))
    return account
  };

  render() {
    const { privateKey, account, balance } = this.state;
    return (
      <View style={styles.container}>
        <Text>Welcome to React Native!</Text>
        <TextInput
          value={ privateKey }
          onChangeText={ privateKey => this.setState({ privateKey }) }
          style={ styles.input }
          placeholder='Enter private key'
        />
        <TouchableOpacity onPress={ () => this.setState({ account: this.getAccountOnPrivateKey(privateKey) })}
                          style={ styles.button }
        >
          <View>
            <Text>Get account</Text>
          </View>
        </TouchableOpacity>
        <View style={ styles.subContainer }>
          <View style={ styles.res }>
            <Text>Address</Text>
            <Text>{ account.address }</Text>
          </View>
          <View>
            <Text>Private Key</Text>
            <Text>{ account.privateKey }</Text>
          </View>
          <View>
            <Text>Balance</Text>
            <Text>{ balance }</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 20,
  },
  subContainer: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '100%',
  },
  input: {
    borderWidth: .5,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 15,
    width: '100%'
  },
  button: {
    backgroundColor: '#aafaaa',
    borderRadius: 5,
    width: '40%',
    alignItems: 'center'
  },
  res: {
    justifyContent: 'space-around'
  }
});
