'use strict';
import React, {Component} from 'react';
import{
    View,
    Text,
    BackHandler,
    TouchableOpacity,
    Image,
    StyleSheet,
    InteractionManager,
    TextInput,
    Platform,
    ToastAndroid,
    Alert,
} from 'react-native';
//(Platform.OS === 'ios') ? '' : '';
import {NaviGoBack} from '../../common/CommonUtils';
import {toastShort} from '../../common/ToastUtil';
import ShortLineTwo from '../../component/ShortLineTwo';
import Register from './Register';
import ResetPwd from  './ResetPwd';
// import styles from '../../common/Style';
import Loading from '../../component/Loading';
const Digits = require('react-native-fabric-digits');
const {DigitsLoginButton, DigitsLogoutButton} = Digits;


class LoginDigits extends Component {
    constructor(props) {
        super(props);
        this.buttonBackAction = this.buttonBackAction.bind(this);
        this.buttonRegisterOrLoginAction = this.buttonRegisterOrLoginAction.bind(this);
        this.buttonChangeState = this.buttonChangeState.bind(this);
        this.findPwdAction = this.findPwdAction.bind(this);
        this.thirdPartLoginAction = this.thirdPartLoginAction.bind(this);
        this.state = {
            username: '',
            password: '',
            logged: false,
            error: false,
            response: {}
        };
        this.completion = this.completion.bind(this);
        this.getSessionDetails = this.getSessionDetails.bind(this);
    }

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this.buttonBackAction);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.buttonBackAction);
    }

    completion(error, response) {
        if (error && error.code !== 1) {
            this.setState({logged: false, error: true, response: {}});
        } else if (response) {
            const logged = JSON.stringify(response) === '{}' ? false : true;
            this.setState({logged: logged, error: false, response: response}, this.getSessionDetails);
        }
    }

    getSessionDetails() {
        if (this.state.logged) {
            this.refs.DigitsLogoutButton.getSessionDetails(function (sessionDetails) {
                Alert.alert('Success!', sessionDetails.phoneNumber);
            });
        }
    }

    //返回
    buttonBackAction() {
        const {navigator} = this.props;
        return NaviGoBack(navigator);
    }

    //用户登录/注册
    buttonRegisterOrLoginAction(position) {
        const {navigator} = this.props;
        if (position === 0) {
            //用户登录
            if (this.state.username === '') {
                toastShort('用户名不能为空...');
                return;
            }
            if (this.state.password === '') {
                toastShort('密码不能为空...');
                return;
            }
            toastShort('登录成功');
        } else if (position === 1) {
            //用户注册
            InteractionManager.runAfterInteractions(() => {
                navigator.push({
                    component: Register,
                    name: 'Register'
                });
            });
        }
    }

    buttonChangeState() {

    }

    findPwdAction() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                component: ResetPwd,
                name: 'ResetPwd'
            });
        });
    }

    thirdPartLoginAction(position) {

    }

    render() {
        const {navigator, dispatch} = this.props;
        console.log(dispatch);

        const error = this.state.error ? <Text>An error occured.</Text> : null;
        const content = this.state.logged ?
            (<View style={styles.container}>
                <Text>
                    OAuth Token: {this.state.response['X-Verify-Credentials-Authorization']}
                </Text>
                <DigitsLogoutButton
                    ref="DigitsLogoutButton"
                    completion={this.completion}
                    text="退出"
                    buttonStyle={styles.DigitsAuthenticateButton}
                    textStyle={styles.DigitsAuthenticateButtonText}/>
            </View>) : (<DigitsLoginButton
                ref="DigitsLoginButton"
                options={{
                    title: "Logging in is great",
                    phoneNumber: "+61",
                    appearance: {
                        backgroundColor: {
                            hex: "#ffffff",
                            alpha: 1.0
                        },
                        accentColor: {
                            hex: "#43a16f",
                            alpha: 0.7
                        },
                        headerFont: {
                            name: "Arial",
                            size: 16
                        },
                        labelFont: {
                            name: "Helvetica",
                            size: 18
                        },
                        bodyFont: {
                            name: "Helvetica",
                            size: 16
                        }
                    }
                }}
                completion={this.completion}
                text="登录"
                buttonStyle={styles.DigitsAuthenticateButton}
                textStyle={styles.DigitsAuthenticateButtonText}/>);
        return (
            <View style={styles.container}>
                {error}
                {content}
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
    },
    DigitsAuthenticateButton: {
        height: 50,
        width: 230,
        backgroundColor: '#13988A',
        justifyContent: 'center',
        borderRadius: 5,
    },
    DigitsAuthenticateButtonText: {
        fontSize: 16,
        color: '#fff',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
});

export default LoginDigits;