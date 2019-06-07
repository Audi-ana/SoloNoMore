import React, {Component} from 'react';
import {connect} from 'react-redux'

//This is called higher order components

export default function(ComposedComponent){

    class Authenticate extends Component{
        
        constructor(props){
            super(props)

            if(!this.props.isAuthenticated){
                this.props.history.push('/')
            }
        }

        render(){
            return(
                <ComposedComponent{...this.props}/>
            )
        }
    }

 //now we have access to the global state
  const mapStateToProps = (state) =>{
      return{
          isAuthenticated: state.isAuthenticated
      }
  }

    return connect(mapStateToProps)(Authenticate)
}