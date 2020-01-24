import React,{Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import setAuthenticationHeader from '../utils/authenticate'
import {withRouter} from 'react-router-dom'
import '../style/Login.css'
import SweetAlert from 'sweetalert2-react'

class Login extends Component{

    constructor(){
        super()

        this.state = {
            username: '',
            password: '',
            alert: '',
            show: false,
        }
    }

    handleLoginClick = ()=>{

        axios.post('https://solonomore-backend.herokuapp/login',{
            username: this.state.username,
            password: this.state.password
        }).then((response) =>{
            if(response.data.message){
                this.setState({
                    alert: response.data.message,
                    show: true
                })
            } else{


        let token = response.data.token
        console.log('logged in!')

        //save token in local storage 
        localStorage.setItem('jsonwebtoken', token)
       
       

        //update redux state isAuthenticated 
        this.props.onAuthenticated(token)
        


        setAuthenticationHeader(token)
        
        this.props.history.push('/home')
            }
        
    })
}


   textBoxChange = (e) =>{

    this.setState({
        [e.target.name]: e.target.value
    })
   }

    render(){
        return(
            <div>
                <input className="inputStyling mt-0" name="username" onChange={this.textBoxChange} placeholder="username"></input>
                <input className="inputStyling mt-0" name="password" type='password' onChange={this.textBoxChange} placeholder="password"></input>
                <button className="buttonStyling" history = {this.props.history} onClick={this.handleLoginClick}>Login</button>
                <SweetAlert
                    show={this.state.show}
                    title='Alert'
                    text={this.state.alert}
                    onConfirm={()=>this.setState({show: false})}
                />
                <div className="messageStyling">Already a member, sign in!</div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onAuthenticated: (token) => dispatch({type:'ON_AUTHENTICATED', token: token})
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Login))