import React,{Component} from 'react';
import '../style/Home.css'
import {connect} from "react-redux"
import axios from 'axios'
import HikingHistoryList from './HikingHistoryList'

class Home extends Component{

    getGeolocation = () =>{
        // gets location
        const geolocation = navigator.geolocation;
        // cosnt timestamp = position.timestamp

        new Promise((resolve,reject)=>{
            if(!geolocation){
                reject(new Error('Not Supported'))
            }
            geolocation.getCurrentPosition((position)=>{
                resolve(position)
            },()=>{
                reject(new Error('Permission denied'))
            })
        }).then(locationObject => {
            console.log(locationObject)
            let coordinates = {userId: locationObject.coords.userId, latitude: locationObject.coords.latitude, longitude: locationObject.coords.longitude, timestamp: locationObject.timestamp}

            // dispatch action
            this.props.newhike(coordinates)
            console.log(coordinates)
                let url = 'http://localhost:8080/api/record-hike'
                axios({
                    method: 'post',
                    url: url,
                    data: coordinates 
                }) //.then(res => this.props.history.push('/home'))
                .catch(error =>console.log('Error:', error))

        })
    }
    
    
    render(){
        return(
            <div>
                <div className="howToDiv">
                <h1>Quick how to:</h1>
                <p>It's simple press the button below. Your current coordinates will then appear at the bottom of your recorded hikes list. There you will be able to click on the coordinates link and view your location on a map. Send the link to your loved ones and keep hiking! Don't lose your sense of adventure and stay safe!</p>
                </div>
            <div className='containerDiv'>
            <img src={require('../images/soloHiker.jpg')}></img>
            <button  className="recordHikeButton" onClick={this.getGeolocation}>Record hike</button>
            </div>
            <HikingHistoryList></HikingHistoryList>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        newhike: (location) => dispatch({type:'NEW_HIKE', value: location})
    }
}

export default connect(null, mapDispatchToProps)(Home)