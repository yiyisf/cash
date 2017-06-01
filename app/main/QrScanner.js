/**
 * Created by zgx on 2017/6/1.
 */
'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Alert,
    Vibration,
    TouchableOpacity,
} from 'react-native';
import Camera from 'react-native-camera';
import {NaviGoBack} from '../common/CommonUtils';

class QrScanner extends Component {
    constructor(props) {
        super(props);
        this._onPressCancel = this._onPressCancel.bind(this);
        this._onBarCodeRead = this._onBarCodeRead.bind(this);
    }
    state = {
        cancelButtonVisible: false,
        cancelButtonTitle: '取消',
        getedBarcode : false,
    };

    _onBarCodeRead(result) {
        if(this.state.getedBarcode){
            return;
        }
        // setTimeout(function () {
            Vibration.vibrate();
        this.state.getedBarcode = true;
            this.props.onSucess(result.data);
            const {navigator} = this.props;
            return NaviGoBack(navigator);
        // }, 500);
    };

    _onPressCancel() {
        const {navigator} = this.props;
        return NaviGoBack(navigator);
    };

    render() {
         return (
            <Camera onBarCodeRead={this.state.getedBarcode?null:this._onBarCodeRead} style={styles.camera}>
                <View style={styles.rectangleContainer}>
                    <View style={styles.rectangle}/>
                </View>
                <View style={styles.cancelButton}>
                    <TouchableOpacity onPress={this._onPressCancel}>
                        <Text style={styles.cancelButtonText}>{this.state.cancelButtonTitle}</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 200,
        justifyContent: 'center'
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    },
    camera: {
        height: 568,
        alignItems: 'center',
    },

    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent',
    },

    cancelButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 3,
        padding: 15,
        width: 100,
        bottom: 10,
    },
    cancelButtonText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#0097CE',
    },
});

export default QrScanner;