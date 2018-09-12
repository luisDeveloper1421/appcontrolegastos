import React, { Component } from 'react';
import { View,ImageBackground, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'

 export default class Home extends Component {
	constructor(props){
		super(props);
		this.state ={};

		this.login = this.login.bind(this);
		this.cadastro = this.cadastro.bind(this);
	}
	static navigationOptions ={
		title:null,
		header:null
	}

	login(){
		this.props.navigation.navigate('Login');
	}

	cadastro(){
		this.props.navigation.navigate('Cadastro');
	}

	render() {
		return (
          <ImageBackground style={styles.container} source={require('../Imagens/Porco.png')}>
		  	<View style={styles.containerBtn}>
			  <Button
  				title="Login"
  				titleStyle={{ fontWeight: "700" }}
  				buttonStyle={styles.btn}
  				onPress={this.login }
			   />
			   <Button
  				title="Cadastro"
  				titleStyle={{ fontWeight: "700" }}
  				buttonStyle={styles.btn}
				  onPress={this.cadastro}
			   />
			</View>
          </ImageBackground>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		flex:1,
		width:null
	},
	btn:{
		backgroundColor: "rgba(92, 99,216, 1)",
    width: 150,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
	borderRadius: 2,
	marginBottom: 15,
	},
	containerBtn:{
		flex:1,
		alignItems: 'center',
		paddingTop:400 ,
	}
});

















