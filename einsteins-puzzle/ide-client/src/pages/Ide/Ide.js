import React, { Component } from 'react'
import './Ide.css'
import axios from 'axios'
import secret from '../../secrets/secret'
import MonacoEditor from 'react-monaco-editor';
import {code} from './defaultCode'

export default class Ide extends Component {
    state={
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
        alert("submit code")
        axios.post(`${secret.url}`,this.state) //!!!!!!!!!!!!!!!!!!
            .then(res=>{
                console.log(res.data)
                const data = res.data
                this.setState({
                    result: data.result
                })

            })
            .catch(err=>{
                console.log(err)
            })
    }


//    onCodeChangeHandler = (newCode, e) => {
//        console.log(e)
//        this.setState({
//            code: newCode
//        })
//    }


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
                            <textarea disabled={true} id="code" rows="5" value={this.state.text_code_1}/>
                            <br />2.
                            <MonacoEditor
                                width="70vw"
                                height="100"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_1}
                                options={options}
                                onChange={this.state.code_1.onCodeChangeHandler}
                            />
                            1.<br />
                            <textarea disabled={true} id="code" rows="33" value={this.state.text_code_2}/>
                            <br />3.
                            <MonacoEditor
                                width="70vw"
                                height="40"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_2}
                                options={options}
                                onChange={this.state.code_2.onCodeChangeHandler}
                            />
                            <br />4.
                            <MonacoEditor
                                width="70vw"
                                height="300"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_3}
                                options={options}
                                onChange={this.state.code_3.onCodeChangeHandler}
                            />
                            <br />5.
                            <MonacoEditor
                                width="70vw"
                                height="200"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_4}
                                options={options}
                                onChange={this.state.code_4.onCodeChangeHandler}
                            />
                            <br />6.
                            <MonacoEditor
                                width="70vw"
                                height="200"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_5}
                                options={options}
                                onChange={this.state.code_5.onCodeChangeHandler}
                            />
                            <br />7.
                            <MonacoEditor
                                width="70vw"
                                height="250"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_6}
                                options={options}
                                onChange={this.state.code_6.onCodeChangeHandler}
                            />
                            <br />8.
                            <MonacoEditor
                                width="70vw"
                                height="500"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_7}
                                options={options}
                                onChange={this.state.code_7.onCodeChangeHandler}
                            />
                            <br />9.
                            <MonacoEditor
                                width="70vw"
                                height="500"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_8}
                                options={options}
                                onChange={this.state.code_8.onCodeChangeHandler}
                            />
                            1.<br />
                            <textarea disabled={true} id="code" rows="66" value={this.state.text_code_3}/>
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
