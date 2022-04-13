import React, { Component } from 'react'
import './Ide.css'
import axios from 'axios'
import secret from '../../secrets/secret'
import MonacoEditor from 'react-monaco-editor';
import { code } from './defaultCode'

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
    }


    onSubmitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios.post(`${secret.url}`, this.state)
            .then(res => {
                console.log(res.data)
                const data = res.data
                this.setState({
                    result: data.result
                })

            })
            .catch(err => {
                console.log(err)
            })
    }


    onCode1ChangeHandler = (newCode, e) => {
        console.log(e)
        this.setState({
            code_1: newCode
        })
    }
    onCode2ChangeHandler = (newCode, e) => {
        console.log(e)
        this.setState({
            code_2: newCode
        })
    }
    onCode3ChangeHandler = (newCode, e) => {
        console.log(e)
        this.setState({
            code_3: newCode
        })
    }
    onCode4ChangeHandler = (newCode, e) => {
        console.log(e)
        this.setState({
            code_4: newCode
        })
    }
    onCode5ChangeHandler = (newCode, e) => {
        console.log(e)
        this.setState({
            code_5: newCode
        })
    }
    onCode6ChangeHandler = (newCode, e) => {
        console.log(e)
        this.setState({
            code_6: newCode
        })
    }    
    onCode7ChangeHandler = (newCode, e) => {
        console.log(e)
        this.setState({
            code_7: newCode
        })
    }
    onCode8ChangeHandler = (newCode, e) => {
        console.log(e)
        this.setState({
            code_8: newCode
        })
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
                        <div className="col-12 mt-5">
                            <p className="lead d-block my-0">Код работы</p>
                            1.
                            <br />
                            <textarea disabled={true} id="code" rows="5" value={this.state.text_code_1} />
                            <br />2.
                            <MonacoEditor
                                width="70vw"
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
                                width="70vw"
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
                                width="70vw"
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
                                width="70vw"
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
                                width="70vw"
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
                                width="70vw"
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
                                width="70vw"
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
                                width="70vw"
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
                    <button className="btn btn-success" onClick={this.onSubmitHandler}>Run</button>
                    <div className="row">
                        <div className="col-12 my-2">
                            <textarea id="result" value={this.state.result} disabled={true}>
                            </textarea>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
