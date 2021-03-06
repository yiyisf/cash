/**
 * Created by liuzhe on 2017/5/26.
 */
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
    PixelRatio,
} from 'react-native';
// import styles from '../../common/Style';
import ImagePicker from 'react-native-image-picker';
import {NaviGoBack} from '../../common/CommonUtils';
class Identity extends Component {


    constructor(props) {
        super();
        this.buttonBackAction = this.buttonBackAction.bind(this);
    }

    state = {
        avatarSource: null,
        videoSource: null
    };
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.buttonBackAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.buttonBackAction);
    }

    buttonBackAction() {
        const {navigator} = this.props;
        return NaviGoBack(navigator);
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            },
            title:'请选择照片或拍照:',
            takePhotoButtonTitle:'拍照',
            cancelButtonTitle:'取消',
            chooseFromLibraryButtonTitle:'图库',
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    selectVideoTapped() {
        const options = {
            title: 'Video Picker',
            takePhotoButtonTitle: 'Take Video...',
            mediaType: 'video',
            videoQuality: 'medium'
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled video picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({
                    videoSource: response.uri
                });
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                        { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                            <Image style={styles.avatar} source={this.state.avatarSource}/>
                        }
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
                    <View style={[styles.avatar, styles.avatarContainer]}>
                        <Text>Select a Video</Text>
                    </View>
                </TouchableOpacity>

                { this.state.videoSource &&
                <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
                }
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
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 1,
        width: 150,
        height: 150
    }
});

export  default  Identity;