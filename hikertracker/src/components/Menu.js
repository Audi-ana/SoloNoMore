import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import '../style/Menu.css'
import {Nav, Navbar} from 'react-bootstrap';



class Menu extends Component{


     
    handleLogoutClick = () =>{

        //remove jsonwebtoken from local storage
        localStorage.removeItem('jsonwebtoken')

        //update global state isAuthenticated = false
        this.props.logout()

        //redirect 
        this.props.history.push('/')
    }
    render(){

        if(this.props.showNavbarOnAuthenticated === true){
            return(

                <Navbar collapseOnSelect expand='lg' bg="light" expand="lg" variant="light">
                <Navbar.Brand><img className="d-inline-block align-top" width="30%" height="30%" src={require('../images/logo.png')} alt="SOlO NO MORE"></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    {/* <NavLink className="navLink" to="/home">Home</NavLink> */}
                    <Nav.Link  onClick={this.handleLogoutClick} className="logoutLinkStyling" href="#link">Logout</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
                )
        }
        else{
            return(
                <div></div>
            )
        }
    }
}

const mapStateToProps = (state) =>{
    return{
        showNavbarOnAuthenticated: state.isAuthenticated
    }
}

export default connect(mapStateToProps)(Menu)