import React, { Component } from 'react';
import './Login.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      pw: '',
    };
  }

  handleAllInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
 
  //   gotoMain = () => {
  //    if(this.state.id.includes("@") && this.state.pw.length >=8){
  //   fetch("http://10.58.5.21:8003/user/login" , {
  //     method:"POST", 
  //     body: JSON.stringify({
  //       email: this.state.id,
  //       password: this.state.pw,
  //     })
  //     .then ()
  //   })
  // }}

   gotoMain = () => {
    if(this.state.id.includes("@") && this.state.pw.length >=8){
    fetch("http://10.58.5.21:8003/user/login" , {
      method:"POST", 
      body: JSON.stringify({
        email: this.state.id,
        password: this.state.pw,
      })
    })
    .then((response) => response.json())
    .then((result) => {
       if (result.message === "SUCCESS") {
         localStorage.setItem('token', result.ACCESS_TOKEN);
         this.props.history.push("/");
         alert("로그인 성공");
       }else { alert("로그인 실패"); console.log(result.message);}
     }
     )
   }
  };

     

  render() {
    return (
      <div className="Login">
        <header>
          <div className='existing_customer'>
            <span>LOGIN AS EXISTING CUSTOMER</span>
          </div>
        </header>
        <div className="login_form">
        <span className={pwAlert? "Invalid": "Valid" }>Invalid email or password.</span>
          <div className='id_form'>
            <label>EMAIL
              <input type="text" onChange={this.handleAllInput} name="id" className="id_box" /> 
            </label>
          </div>
          <div className='pw_form'>
            <label>PASSWORD
              <input type="password" onChange={this.handleAllInput} name="pw" className="pw_box" /> 
            </label>
          </div>
          <div className='check_box'>
            <label for="remember_me">
              <input type="checkbox" id="remember_me" name="remember_me"/> 
              REMEMBER ME
            </label>
          </div>
          <button onClick = {this.gotoMain} className="login_btn">Login</button>
          <div className= 'forget_pw'>
            <a href="https://takecareof.com">Forget Password?</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
