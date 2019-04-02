/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View,TouchableOpacity, StyleSheet, ViewPropTypes } from 'react-native';
import Editor from './RichTextEditor'
import RichTextEditor from "./RichTextEditor/RichTextEditor";

export default class App extends Component<Props> {
    fontSize = 20

    setBold = () => {
        this.editorRef.setBold()
    };

    setItalic = () => {
        this.editorRef.setItalic()
    };

    setUnderline = () => {
        this.editorRef.setUnderline()
    };

    setStrike = () => {
        this.editorRef.setStrike();
    };

    upFontSize = () => {
        this.fontSize +=1;
        this.editorRef.setFontSize(this.fontSize)
    };

    downFontSize = () => {
        this.fontSize -=1;
        this.editorRef.setFontSize(this.fontSize)
    };

    setColor = color => {
        this.editorRef.setTextColor(color)
    };
    
    setBackground =  color => {
        this.editorRef.setBackground(color)
    };

    componentDidMount(): void {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex : 1, height :300,}}>
                    <Editor ref = {ref => this.editorRef = ref}
                            style={styles.editor}
                            onChangeText = {text => console.log('on change',text)}
                    />
                </View>
                <View style={{flex: 1}}>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button}
                                          onPress={this.setBold}
                        >
                            <Text>B</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={this.setItalic}
                        >
                            <Text>I</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={this.setUnderline}
                        >
                            <Text>U</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={this.setStrike}
                        >
                            <Text>S</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={this.upFontSize}
                        >
                            <Text>Font +</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={this.downFontSize}
                        >
                            <Text>Font -</Text>
                        </TouchableOpacity>
                    </View>
                    {/*row 2*/}
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => this.setColor('red')}
                        >
                            <Text>Color Red</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => this.setColor('blue')}
                        >
                            <Text>Color Blue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => this.setColor('green')}
                        >
                            <Text>Color Green</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => this.setColor('gray')}
                        >
                            <Text>Color Gray</Text>
                        </TouchableOpacity>

                    </View>
                    {/*row 3*/}
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => this.setBackground('red')}
                        >
                            <Text>BG Red</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => this.setBackground('blue')}
                        >
                            <Text>BG Blue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => this.setBackground('green')}
                        >
                            <Text>BG Green</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => this.setBackground('gray')}
                        >
                            <Text>BG Gray</Text>
                        </TouchableOpacity>

                    </View>
                    {/*row 4*/}
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => this.editorRef.setIndent()}
                        >
                            <Text>Indent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => this.editorRef.setOutDent()}
                        >
                            <Text>Outdent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => this.editorRef.getHtml().then(msg => console.log(msg))}
                        >
                            <Text>Get html</Text>
                        </TouchableOpacity>
                    </View>
                    {/*row 5*/}
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => this.editorRef.setAlign(RichTextEditor.ALIGNS.LEFT)}
                        >
                            <Text>Align Left</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => this.editorRef.setAlign(RichTextEditor.ALIGNS.RIGHT)}
                        >
                            <Text>Align Right</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => this.editorRef.setAlign(RichTextEditor.ALIGNS.CENTER)}
                        >
                            <Text>Align Center</Text>
                        </TouchableOpacity>
                    </View>
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
    row : {
        flexDirection: 'row',
        marginTop : 10,
    },
    button : {
        flex : 1,
        marginHorizontal : 10,
        paddingVertical :10,
        borderColor : 'gray',
        borderWidth : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    editor:{
        flex : 1,
        backgroundColor: 'red',
        color : 'blue',
        fontSize : 22
    }
});
