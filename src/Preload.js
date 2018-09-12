import React, { Component } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import firebase from './ConectionFirebase'


 export default class Preload extends Component {
	constructor(props){
		super(props);
        this.state ={};
        
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.props.navigation.navigate('Iterna');
            }else{
                this.props.navigation.navigate('Login');
            }
        });
	}
	static navigationOptions ={
		title:null,
		header:null
	}

	render() {
		return (
          <ImageBackground style={styles.container} source={require('../Imagens/Porco.png')}>
		  	
          </ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		width:null
	},
});

















