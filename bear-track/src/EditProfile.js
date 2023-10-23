import React, { Component } from "react";
import './components/EditProfile.css';
import { Modal, Button } from 'antd';
import { Link} from "react-router-dom";


class EditProfile extends Component {
    //Joseph's Code
    constructor(props){
        super(props);
        this.state={
            visible: false,
            profileName: " ",
        }
    }
    showModal = () =>{
        this.setState({
            visible: false,
        });
    };

    handleOk = e =>{
        console.log(e);
        this.setState({
            visible: true,
        });
    };

    handleCancel = e =>{
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    //Muhammad's code

    //Function to handle changes to the profile name input
    // handleProfileNameChange = (event) =>{
    //     this.setState({ profileName: event.target.value});
    // };

    // // Function to save the profile name
    // saveName = () =>{
    //     console.log("Saving profile name: ", this.state.profileName);
    // };

    render(){
        return (

            <div>
            </div>
        );
    }
}


export default EditProfile;

