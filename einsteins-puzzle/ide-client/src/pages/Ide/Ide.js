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
        lang: 'cpp'
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        alert("submit code")
        axios.post(`${secret.url}code/submit`,this.state)
            .then(res=>{
                console.log(res.data)
                const data = res.data
                if(data.err){
                    // Error in user code
                    this.setState({
                        result: data.error
                    })
                }else{
                    this.setState({
                        result: data.output
                    })
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }


    onCodeChangeHandler = (newCode, e) => {
        console.log(e)
        this.setState({
            code: newCode
        })
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
        console.log(this.state)
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mt-5">

                            <p className="lead d-block my-0">Код работы</p>
                            <h>1.</h>
                            <br />
                            <textarea disabled={true} id="code" rows="5" value={this.state.text_code_1}/>
                            <br /><h>2.</h>
                            <MonacoEditor
                                width="70vw"
                                height="100"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_1}
                                options={options}
                                onChange={this.state.code_1.onCodeChangeHandler}
                            />
                            <h>1.</h><br />
                            <textarea disabled={true} id="code" rows="33" value={this.state.text_code_2}/>
                            <br /><h>3.</h>
                            <MonacoEditor
                                width="70vw"
                                height="40"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_2}
                                options={options}
                                onChange={this.state.code_2.onCodeChangeHandler}
                            />
                            <br /><h>4.</h>
                            <MonacoEditor
                                width="70vw"
                                height="300"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_3}
                                options={options}
                                onChange={this.state.code_3.onCodeChangeHandler}
                            />
                            <br /><h>5.</h>
                            <MonacoEditor
                                width="70vw"
                                height="200"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_4}
                                options={options}
                                onChange={this.state.code_4.onCodeChangeHandler}
                            />
                            <br /><h>6.</h>
                            <MonacoEditor
                                width="70vw"
                                height="200"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_5}
                                options={options}
                                onChange={this.state.code_5.onCodeChangeHandler}
                            />
                            <br /><h>7.</h>
                            <MonacoEditor
                                width="70vw"
                                height="250"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_6}
                                options={options}
                                onChange={this.state.code_6.onCodeChangeHandler}
                            />
                            <br /><h>8.</h>
                            <MonacoEditor
                                width="70vw"
                                height="500"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_7}
                                options={options}
                                onChange={this.state.code_7.onCodeChangeHandler}
                            />
                            <br /><h>9.</h>
                            <MonacoEditor
                                width="70vw"
                                height="500"
                                language="cpp"
                                theme="vs-dark"
                                value={this.state.code_8}
                                options={options}
                                onChange={this.state.code_8.onCodeChangeHandler}
                            />
                            <h>1.</h><br />
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
