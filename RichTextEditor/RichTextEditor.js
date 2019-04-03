import React, {Component} from 'react';
import {View, StyleSheet, UIManager, requireNativeComponent, findNodeHandle,processColor} from 'react-native';

const RichText = requireNativeComponent('RichEditText');
const RichTextConfig = UIManager.getViewManagerConfig('RichEditText');

class RichTextEditor extends Component {
    static defaultProps = {
        onChangeText : () => {},
        onTypeChange : () => {}, //"BOLD", "ITALIC"
    };

    static ALIGNS = {
        LEFT : 'alignLeft',
        RIGHT: 'alignRight',
        CENTER : 'alignCenter'
    };

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
        UIManager.dispatchViewManagerCommand(this.nodeId,RichTextConfig.Commands.editorColor,[color]);
    };

    setBackground = color => {
        color = parseInt(processColor(color));
        UIManager.dispatchViewManagerCommand(this.nodeId,RichTextConfig.Commands.editorBackground,[color]);
    };

    setIndent = () => {
        UIManager.dispatchViewManagerCommand(this.nodeId,RichTextConfig.Commands.indent,null);
    };

    setOutDent = () => {
        UIManager.dispatchViewManagerCommand(this.nodeId,RichTextConfig.Commands.outdent,null);
    };

    setAlign = position => {
        const {ALIGNS} = RichTextEditor;
        if(!Object.keys(ALIGNS).map(key => ALIGNS[key]).includes(position)){
            return;
        }
        UIManager.dispatchViewManagerCommand(this.nodeId,
            RichTextConfig.Commands[position],null)
    };

    getHtmlPromise = null;
    getHtml = () => new Promise(
         (resolve, reject) => {
            this.getHtmlPromise = {resolve, reject};
            UIManager.dispatchViewManagerCommand(this.nodeId,
                RichTextConfig.Commands.getHtml,null)
        }
    );

    onReturnHtml = ({nativeEvent : {html}}) => {
        if(this.getHtmlPromise){
            this.getHtmlPromise.resolve(html)
        }
    };

    setHtml = text => {
        UIManager.dispatchViewManagerCommand(this.nodeId,
            RichTextConfig.Commands.setHtml,
            [text])
    };

    onChangeText = ({nativeEvent : {html}}) => {
        this.props.onChangeText(html)
    };

    onTypeChange = ({nativeEvent : {types}}) => {
        console.log(types)
        this.props.onTypeChange(types)
    };

    componentDidMount(): void {
        this.nodeId = findNodeHandle(this.richTextRef);
        const {style,initValue} = this.props;
        if(style){
            const _style = StyleSheet.flatten(style);
            if(_style.hasOwnProperty('color')){
                this.setTextColor(_style.color)
            }
            if(_style.hasOwnProperty('backgroundColor')){
                this.setBackground(_style.backgroundColor)
            }
            if(_style.hasOwnProperty('fontSize')){
                this.setFontSize(parseInt(_style.fontSize))
            }
            if(initValue){
                this.setHtml(initValue);
            }
        }
    }

    render() {
        return (
            <View style={[styles.container,this.props.style]}>
                <RichText style={styles.flex}
                          ref={ref => this.richTextRef = ref}
                          onReturnHtml={this.onReturnHtml}
                          onChangeText={this.onChangeText}
                          onTypeChange={this.onTypeChange}
                />
            </View>
        )
    }
}

export default RichTextEditor

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden'
    },
    flex : {
        flex : 1
    }
});