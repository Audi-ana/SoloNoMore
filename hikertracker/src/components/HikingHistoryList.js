import React, {Component} from 'react';
import {connect} from "react-redux"
import axios from 'axios'
import '../style/HikingHistoryList.css'
import Moment from 'react-moment';
// import Time from "react-time-format"

class HikingHistoryList extends Component{



     componentDidMount(){

        this.populateHikes()
        
    }

populateHikes(){

     //fetching hiking records
     let url = 'https://solonomore-backend.herokuapp/api/hiking-history'
     axios.get(url)
     .then(response => {
         console.log(response.data)
         this.props.fetchedHikes(response.data)
     }) 
}

    deleteButtonClick = (recordId) =>{
        
        let url = `https://solonomore-backend.herokuapp/delete/${recordId}`

        axios.delete(url)
        .then( res =>{
            this.populateHikes()
            
        })
        .catch((err)=>{
            console.log(err)
        })
        
        
    }
    



    render(){

        const records = this.props.hiking
        console.log(records)
        
        let record = records.map((record)=>{
            return <li className="listStylingDiv" key={record.id}>
            Shareable coordinates link: <a className="logLatLinkStyling"href={`https://www.latlong.net/c/?lat=${record.latitude}&long=${record.longitude}`}>{record.latitude}, {record.longitude}</a>
            <span>Date and Time recorded: <i><Moment parse="YYYY-MM-DD HH:mm">{record.timestamp} </Moment></i></span>
            <button className="deleteButtonStyling"onClick={() => this.deleteButtonClick(record.id)}>Delete</button>
            </li>
        })
        return(
            <div>
                <h1 className="recordedHikesHeading">Recorded Hikes</h1>
                {record}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        hiking: state.hikingHistory
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        fetchedHikes: (records) => dispatch({type: 'FETCHED_HIKES', value: records})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HikingHistoryList)