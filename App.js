/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TouchableOpacity , requireNativeComponent, findNodeHandle, UIManager} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

const RichText = requireNativeComponent('RichEditText');
const RichTextConfig = UIManager.getViewManagerConfig('RichEditText');

type Props = {};
export default class App extends Component<Props> {

    fontSize = 10;

    setBold = () => {
        console.log(RichTextConfig)
        UIManager.dispatchViewManagerCommand(this.nodeId,0,null)
    };

    setItalic = () => {
        UIManager.dispatchViewManagerCommand(this.nodeId,1,null)
    };

    setFontSize = () => {
        this.fontSize -= 1;
        UIManager.dispatchViewManagerCommand(this.nodeId,RichTextConfig.Commands.fontSize,[this.fontSize]);
        this.forceUpdate();
    };

    setFontSize2 = () => {
        this.fontSize += 1;
        UIManager.dispatchViewManagerCommand(this.nodeId,RichTextConfig.Commands.fontSize,[this.fontSize]);
        this.forceUpdate();
    };



    componentDidMount(): void {
        console.log(RichTextConfig)
        this.nodeId = findNodeHandle(this.richTextRef);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{overflow: 'hidden',flex : 1, height :300,}}>

                    <RichText style={{backgroundColor: 'green', borderWidth: 1, color : 'blue',flex : 1}}
                              bold={true}
                              ref={ref => this.richTextRef = ref}
                              autoComplete={'off'}
                              autoCorrect={false}
                    />
                </View>
                <View style={{flex: 1,flexDirection : 'row'}}>
                    <TouchableOpacity style={{flex : 1, height : 40, backgroundColor : 'red'}}
                                      onPress={this.setBold}
                    >
                        <Text>Bold</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex : 1, height : 40, backgroundColor : 'green'}}
                                      onPress={this.setItalic}
                    >
                        <Text>Italic</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex : 1, height : 40, backgroundColor : 'blue'}}
                                      onPress={this.setFontSize}
                    >
                        <Text>Font + {this.fontSize} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex : 1, height : 40, backgroundColor : 'blue'}}
                                      onPress={this.setFontSize2}
                    >
                        <Text>Font + {this.fontSize} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
