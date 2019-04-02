import React, {Component} from 'react';
import {View, StyleSheet, UIManager, requireNativeComponent, findNodeHandle,processColor} from 'react-native';

const RichText = requireNativeComponent('RichEditText');
const RichTextConfig = UIManager.getViewManagerConfig('RichEditText');

class RichTextEditor extends Component {
    fontSize = 10;

    setBold = () => {
        UIManager.dispatchViewManagerCommand(this.nodeId,RichTextConfig.Commands.bold,null)
    };

    setItalic = () => {
        UIManager.dispatchViewManagerCommand(this.nodeId,RichTextConfig.Commands.italic,null)
    };

    setUnderline = () => {
        UIManager.dispatchViewManagerCommand(this.nodeId,RichTextConfig.Commands.underline,null)
    };

    setStrike = () => {
        UIManager.dispatchViewManagerCommand(this.nodeId,RichTextConfig.Commands.strike,null)
    };


    setFontSize = fontSize => {
        UIManager.dispatchViewManagerCommand(this.nodeId,RichTextConfig.Commands.editorSize,[fontSize]);
    };

    setTextColor = color => {
        color = parseInt(processColor(color));
        console.log('color',color);
        UIManager.dispatchViewManagerCommand(this.nodeId,RichTextConfig.Commands.editorColor,[color]);
    };

    setBackground = color => {
        color = parseInt(processColor(color));
        console.log('background',color);
        UIManager.dispatchViewManagerCommand(this.nodeId,RichTextConfig.Commands.editorBackground,[color]);
    };

    setIndent = () => {
        UIManager.dispatchViewManagerCommand(this.nodeId,RichTextConfig.Commands.indent,null);
    };

    setOutDent = () => {
        UIManager.dispatchViewManagerCommand(this.nodeId,RichTextConfig.Commands.outdent,null);
    };

    componentDidMount(): void {
        this.nodeId = findNodeHandle(this.richTextRef);
    }

    render() {
        console.log('c',16777216 + parseInt(processColor('rgb(255,0,0)')));
        return (
            <View style={[styles.container,this.props.style]}>
                <RichText style={styles.flex}
                          ref={ref => this.richTextRef = ref}
                />
            </View>
        )
    }
}

export default RichTextEditor

const styles = StyleSheet.create({
    container: {},
    flex : {
        flex : 1
    }
});