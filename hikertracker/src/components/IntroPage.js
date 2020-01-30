import React, {Component} from 'react'
import { connect } from 'react-redux'
import "../style/IntroPage.css"
import "react-bootstrap"
class IntroPage extends Component{

    componentDidMount(){
        this.props.hideMenu()
    }

    routeChange = () =>{
        this.props.history.push(`/Registration-Login`)
    }
    
    render(){
        return(
            <div className="background">
                <div className="logoDiv">
                    <div className="imageDiv">
                <img className="logoStyling" src={require('../images/logo.png')} alt="SoloNoMore Logo"></img>
                </div> 
                <div className="paragraphStyling">
                <p>"Solo No More" is a app for those who love to hike. Sadly there have been many reports of professional and recreational hikers getting lost or going missing. So this app was created to keep track of your hikes and send notification your location to your loved ones!</p>
                </div>
                <div className="buttonsDiv">
                    <button className="introPageButtonStyling" onClick={this.routeChange}>Register</button>
                    <button className="introPageButtonStyling" onClick={this.routeChange}>Login</button>
                </div>
                </div>
            </div>
        )
    }
}

 const mapDispatchToProps = (dispatch) =>{
     return{
         hideMenu: ()=> dispatch({type: 'HIDE_MENU'})
     }
 }

export default  connect(null, mapDispatchToProps)(IntroPage)