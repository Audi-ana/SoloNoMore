import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom' // By default history is only available with the routes. In order to use else where you have to import withRouter.
import Menu from './Menu'



class BaseLayout extends Component{

    render(){
        return(
            <div>
                <Menu isAuthenticated = {this.props.isAuthenticated} logout={this.props.onLogout}
                history = {this.props.history}/>
              {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onLogout: () => dispatch({type: 'LOGOUT'})
    }
}

//Now this is available but only to the BaseLayout so in order to access it on the Menu property we use our callbacks 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BaseLayout))