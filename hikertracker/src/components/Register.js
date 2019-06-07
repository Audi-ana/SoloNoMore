import React, {Component} from 'react'
import Login from './Login'
import axios from 'axios';
import SweetAlert from 'sweetalert2-react'
import '../style/Register.css'

export class Register extends Component{

    constructor(){
        super()

        this.state = {
            username: '',
            password: '',
            alert: '',
            show: false,
        }
    }

 

    textBoxChange = (e) =>{

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegisterClick = () =>{
       
        let url = 'http://localhost:8080/register'
            
       axios({
        method: 'post',
        url: url,
        data:{
            username: this.state.username,
            password: this.state.password
        }
       })
       .then((response) => {
           if(response.data.message){
               this.setState({
               alert: response.data.message,
               show: true
           })
    
        }
        else if(response.data.success){
            this.setState({
                alert:response.data.success,
                show:true
            })
        }
       })


    }
    render(){

        return(
            <div className="backgroundImg">
                <div className="container">
                    <div className="row">
                        <div className="registerDiv col mt ml-1">
                            <input className="mt-0" name="username" onChange={this.textBoxChange}  placeholder="username"></input>
                            <input className="mt-0" name="password" type="password" onChange={this.textBoxChange} placeholder="password"></input>
                            <button className="buttonStyling" onClick={this.handleRegisterClick}>Register</button>
                            <SweetAlert
                                show={this.state.show}
                                title='Alert'
                                text= {this.state.alert}
                                onConfirm={()=> this.setState({ show: false })}
                            />
                            <div className="messageStyling">  Not a member, sign up!</div>
                        </div>
                        <div className="signInDiv col mt ml-1">
                            <Login/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}