import React, { Component } from 'react'
import './Ide.css'
import axios from 'axios'
import secret from '../../secrets/secret'
import MonacoEditor from 'react-monaco-editor';
import { code } from './defaultCode'
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker()
    return (
        promiseInProgress &&
        <Loader type="ThreeDots" color="#2BAD60" height="38" />
    );
}

export default class Ide extends Component {
    state = {
        result: 'Запустите код, чтобы увидеть результат',
        text_code_1: code.text_code_1,
        text_code_2: code.text_code_2,
        text_code_3: code.text_code_3,
        code_1: code.code_1,
        code_2: code.code_2,
        code_3: code.code_3,
        code_4: code.code_4,
        code_5: code.code_5,
        code_6: code.code_6,
        code_7: code.code_7,
        code_8: code.code_8,
        time_start: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
        time_end: "",
        token: ""
    }


    onSubmitHandler = (e) => {
        e.preventDefault()
        this.state.time_end = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
        trackPromise(
            axios.post(`${secret.url}`, this.state)
                .then(res => {
                    const data = res.data
                    this.setState({
                        result: data.result
                    })
                })
                .catch(err => {
                    console.log(err)
                }))
    }


    onCode1ChangeHandler = (newCode, e) => {
        this.setState({code_1: newCode})
    }
    
    onCode2ChangeHandler = (newCode, e) => {
        this.setState({code_2: newCode})
    }
    
    onCode3ChangeHandler = (newCode, e) => {
        this.setState({code_3: newCode})
    }
    
    onCode4ChangeHandler = (newCode, e) => {
        this.setState({code_4: newCode})
    }
    
    onCode5ChangeHandler = (newCode, e) => {
        this.setState({code_5: newCode})
    }
    
    onCode6ChangeHandler = (newCode, e) => {
        this.setState({code_6: newCode})
    }
    
    onCode7ChangeHandler = (newCode, e) => {
        this.setState({code_7: newCode})
    }
    
    onCode8ChangeHandler = (newCode, e) => {
        this.setState({code_8: newCode})
    }

    onTokenChangeHandler = (NewToken, e) => {
        this.setState({token: NewToken.target.value})
    }

    editorDidMount = (e) => {
        console.log("EDITOR MOUNTED")
    }

    render() {
        const options = {
            selectOnLineNumbers: true,
            renderIndentGuides: true,
            colorDecorators: true,
            cursorBlinking: "blink",
            autoClosingQuotes: "always",
            find: {
                autoFindInSelection: "always"
            },
            snippetSuggestions: "inline"
        };
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col mt-5">
                            <p className="lead d-block my-0">Код работы</p>
                            1.
                            <br />
                            <textarea disabled={true} id="code" rows="5" value={this.state.text_code_1} />
                            <br />2.
                            <MonacoEditor
                                height="100"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_1}
                                options={options}
                                onChange={this.onCode1ChangeHandler}
                                editorDidMount={this.editorDidMount}
                            />
                            1.<br />
                            <textarea disabled={true} id="code" rows="33" value={this.state.text_code_2} />
                            <br />3.
                            <MonacoEditor
                                height="40"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_2}
                                options={options}
                                onChange={this.onCode2ChangeHandler}
                                editorDidMount={this.editorDidMount}
                            />
                            <br />4.
                            <MonacoEditor
                                height="300"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_3}
                                options={options}
                                onChange={this.onCode3ChangeHandler}
                                editorDidMount={this.editorDidMount}
                            />
                            <br />5.
                            <MonacoEditor
                                height="200"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_4}
                                options={options}
                                onChange={this.onCode4ChangeHandler}
                                editorDidMount={this.editorDidMount}
                            />
                            <br />6.
                            <MonacoEditor
                                height="200"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_5}
                                options={options}
                                onChange={this.onCode5ChangeHandler}
                                editorDidMount={this.editorDidMount}
                            />
                            <br />7.
                            <MonacoEditor
                                height="250"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_6}
                                options={options}
                                onChange={this.onCode6ChangeHandler}
                                editorDidMount={this.editorDidMount}
                            />
                            <br />8.
                            <MonacoEditor
                                height="500"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_7}
                                options={options}
                                onChange={this.onCode7ChangeHandler}
                                editorDidMount={this.editorDidMount}
                            />
                            <br />9.
                            <MonacoEditor
                                height="500"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_8}
                                options={options}
                                onChange={this.onCode8ChangeHandler}
                                editorDidMount={this.editorDidMount}
                            />
                            1.<br />
                            <textarea disabled={true} id="code" rows="66" value={this.state.text_code_3} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-auto">
                            <button className="btn btn-success" onClick={this.onSubmitHandler}>Run</button>
                        </div>
                        <div className="col"><LoadingIndicator /></div>
                    </div>
                    <div className="row">
                        <div className="col my-2">
                            <textarea type="text" 
                                      id="token" 
                                      rows="1" 
                                      value={this.state.token} 
                                      onChange={this.onTokenChangeHandler}
                                      placeholder="Введите персональный токен"> 
                            </textarea >
                            <textarea id="result" value={this.state.result} disabled={true}></textarea>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
