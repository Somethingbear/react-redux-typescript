import React, { Component } from 'react';


import { JSEncrypt } from 'jsencrypt';
import { postQuery } from '../common/util/request'



class App extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
          </p>
            <input type={"text"} name={"username"} className={""} placeholder={"用户名"}/>
            <input type={"password"} name={"password"} className={""} placeholder={"密码"}/>
            <button onClick={this.login}>登陆</button>
            <button onClick={this.test}>测试</button>
        </header>
      </div>
    );
  }

  login = () => {
    postQuery('/login',{username:'admin', password: '111111'})
    .then(res => {

    })
  }

  test = () => {
    postQuery('/mgr/list',{page: 1, limit: 10})
  }

  submitForm = () => {
    //公钥
    let PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8HMr2CBpoZPm3t9tCVlrKtTmI4jNJc7/HhxjIEiDjC8czP4PV+44LjXvLYcSV0fwi6nE4LH2c5PBPEnPfqp0g8TZeX+bYGvd70cXee9d8wHgBqi4k0J0X33c0ZnW7JruftPyvJo9OelYSofBXQTcwI+3uIl/YvrgQRv6A5mW01QIDAQAB';
    //使用公钥加密
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----' + PUBLIC_KEY + '-----END PUBLIC KEY-----');
    console.log(encrypt.encrypt('111111'));
    // let theForm = document.forms[0];
    // theForm.password.value = encrypt.encrypt(theForm.password.value);
    
    // theForm.submit();
  }
}

export default App;
