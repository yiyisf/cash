/**
 * Created by zgx on 2017/6/1.
 */
'use strict';

import React, {Component} from 'react'
import  QRCode from 'react-native-qrcode';
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import styles from '../common/Style';

class Qrcode extends Component{
    state = {
        text: 'http://facebook.github.io/react-native/',
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({text: text})}
                    value={this.state.text}
                />
                <QRCode
                    value={this.state.text}
                    size={200}
                    bgColor='purple'
                    fgColor='white'/>
            </View>
        );
    };
}

export  default Qrcode;


