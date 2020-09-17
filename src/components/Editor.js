import React, { useState, useEffect } from 'react';
import { Navbar, Text, AnchorButton, FileInput } from '@blueprintjs/core';

import { EditSwitch } from './Buttons';

// import img from '../asset/img.jpg';

const MenuBar = (props) => {
    const [fileText, setFileText] = useState('Header Image...');
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [un, setUn] = useState(false);

    useEffect(() => {
        if(props.atrs.length === 0){
            setBold(false);
            setItalic(false);
            setUn(false);
        }
        props.atrs.map(item => {
            switch (item) {
                case 'strong':
                    setBold(true);
                    break;
                case 'em':
                    setItalic(true);
                    break;
                case 'u':
                    setUn(true);
                    break;
                default:
                    setBold(false);
                    setItalic(false);
                    setUn(false);
                    break;
            }
        });
    });

    return (
        <Navbar>
            <Navbar.Group>
                <Navbar.Heading>Text Editor</Navbar.Heading>
                <Navbar.Divider />
                <EditSwitch icon='bold' active={bold} onClick={() => changeStyle('strong')} />
                <EditSwitch icon='italic' active={italic} onClick={() => changeStyle('em')} />
                <EditSwitch icon='underline' active={un} onClick={() => changeStyle('u')} />
                <Navbar.Divider />
                <EditSwitch icon='align-right' onClick={() => props.onAlignChange('right')} />
                <EditSwitch icon='align-justify' onClick={() => props.onAlignChange('justify')} />
                <EditSwitch icon='align-center' onClick={() => props.onAlignChange('center')} />
                <EditSwitch icon='align-left' onClick={() => props.onAlignChange('left')} />
                <Navbar.Divider />
                <FileInput text={fileText} onInputChange={(v) => { props.onImage(v.currentTarget.files[0]); 
                            setFileText(v.currentTarget.files[0].name) }} />
                <Navbar.Divider />
                <EditSwitch intent='danger' onClick={() => changeStyle('red')} />
                <EditSwitch intent='primary' onClick={() => changeStyle('blue')} />
                <EditSwitch intent='success' onClick={() => changeStyle('green')} />
                <EditSwitch intent='warning' onClick={() => changeStyle('yellow')} />
                <EditSwitch intent='none' />
            </Navbar.Group>
        </Navbar>
    );
}

const StatusBar = (props) => {
    const handleExport = () => {
        const content = document.getElementById('Editable').innerHTML;
        console.log(content);
    }
    const handleClear = () => {
        const content = document.getElementById('Editable').innerHTML = '';
    }

    return (
        <Navbar>
            <Navbar.Group>
                <Text>Lines : 123 </Text>
                <Navbar.Divider />
                <Text>Words : 123 </Text>
                <Navbar.Divider />
                <Text>Characters : 123 </Text>
                <Navbar.Divider />
                <AnchorButton minimal text='Clear' onClick={handleClear} />
                <Navbar.Divider />
                <AnchorButton minimal text='Export' onClick={handleExport} />
            </Navbar.Group>
        </Navbar>
    );
}

function oldChangeStyle(style){
    let sel = window.getSelection();
    let range = sel.getRangeAt(0);
    let classes = sel.extentNode.firstElementChild && sel.extentNode.firstElementChild.classList;
    if (classes) {
        classes.remove('undefined');
        classes.remove('red');
        classes.remove('blue');
        classes.remove('yellow');
        classes.remove('green');
        // classes.remove('img');
    }
    if (classes && style === 'bold' && classes.contains('bold')) {
        classes.remove('bold');
        return;
    }
    if (classes && style === 'italic' && classes.contains('italic')) {
        classes.remove('italic');
        return;
    }
    if (classes && style === 'un' && classes.contains('un')) {
        classes.remove('un');
        return;
    }
    const cont = sel.toString();
    range.deleteContents();

    if (sel.rangeCount) {
        let e = document.createElement('span');
        console.log(classes);
        e.classList = classes;
        e.classList.add(style);
        e.innerHTML = cont;

        // range.deleteContents();
        range.insertNode(e);
        // console.log(sel.extentNode.firstElementChild.classList);
    }
}

function changeStyle(style) {
    let selObj = document.getSelection();
    let range = selObj.getRangeAt(0);
    let cloned = range.cloneContents();
    let clonedContent = cloned.textContent;
    let clonedAtrs = getSelectAtrs();

    if(!clonedAtrs.includes(style)){
        // console.log(style);
        let e = document.createElement(style);
        e.innerHTML = clonedContent;

        range.deleteContents();
        range.insertNode(e);
    } else {
        /* 
            TODO:
                - Must be like https://ckeditor.com/ckeditor-5/demo/
                - Remove Underlined
                - Just Bold and Italic is needed
        */
        let e = document.createTextNode(clonedContent);
        cloned.childNodes.forEach((node) => {
            if(node.nodeName.toLowerCase() === style){
                cloned.removeChild(node);
            }
        });
        cloned.appendChild(e);
        range.deleteContents();
        range.insertNode(cloned);
    }
}

function getSelectAtrs(){
    const atrs = [];
    let selObj = document.getSelection();
    let cloned = '';
    cloned = selObj.getRangeAt(0).cloneContents();
    const nodeList = cloned.childNodes;
    nodeList.forEach((node,i) => {
        if(i !== nodeList.length - 1){
            node.nodeName !== '#text' && atrs.push(node.nodeName.toLowerCase());
        }
    });
    
    return atrs
}

export default function Editor(props) {
    const [textAlign, setTextAlign] = useState('left');
    const [img, setImg] = useState();
    const [textAtrs, setTextAtrs] = useState([]);

    return (
        <div className='editor' style={{ height: '83%', textAlign: 'center' }} autoCorrect='false'>
            <MenuBar onAlignChange={setTextAlign} atrs={textAtrs} onImage={setImg} />
            <div onSelect={() => setTextAtrs(getSelectAtrs())} suppressContentEditableWarning
                 contentEditable={true} id='Editable' style={{ textAlign }}>
            {img && <img src={require('../asset/' + img.name)} style={{                
                width: '100%',
                maxHeight: 400,
                borderRadius: 15,
                boxShadow:' 0 0 20px 0 rgba(27, 22, 22, 0.5)'
            }} />}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
            et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
             velit esse cillum dolore eu <strong>fugiat</strong> <u>nulla</u> <em>pariatur</em>.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <StatusBar />
        </div>
    );
}