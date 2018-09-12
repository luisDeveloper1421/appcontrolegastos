import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import firebase from './ConectionFirebase'

 export default class Cadastro extends Component {

	static navigationOptions ={
		title:'Cadastro',
		headerStyle:{
			backgroundColor:'#37b8a7'
		},headerTintColor:"#fff"
	}

	constructor(props){
		super(props);
		this.state ={email:'',senha:''};
		this.cadastrar = this.cadastrar.bind(this);
		firebase.auth().signOut();
	}

	cadastrar(){
		if(this.state.email != '' && this.state.senha != ''){
			firebase.auth().onAuthStateChanged((user)=>{
				if(user){
					let uid = user.uid;
					firebase.database().ref('SaldoUsuario').child(uid).set({
						saldo:0
					})
					this.props.navigation.navigate('Iterna');
				}
			})

			firebase.auth().createUserWithEmailAndPassword(
				this.state.email,
				this.state.senha
			).catch((error)=>{
				alert(error.code)
				
			});
		}
	}

	// sucsses(){
	// 	alert('sucesso','Login realizado com sucesso!',{text: 'OK', onPress: () => console.log('OK Pressed')});
	// }
  render() {
		return (
		  <View style={styles.container}>
		  <FormLabel labelStyle={{fontSize:15}}>Email</FormLabel>
			<FormInput inputStyle={{paddingLeft:5}} onChangeText={(email) => this.setState({email})}/>

		   <FormLabel labelStyle={{marginTop:25,fontSize:15}}>Senha</FormLabel>
			<FormInput inputStyle={{paddingLeft:5}} secureTextEntry={true} onChangeText={(senha) => this.setState({senha})}/>
			<View style={styles.containerBtn}>
			<Button
  				title="Salvar"
  				titleStyle={{ fontWeight: "700" }}
  				buttonStyle={styles.btn}
				onPress={this.cadastrar} 
			   />
			   </View>
		  </View>
		);
	}

}
const styles = StyleSheet.create({
	container:{
		flex:1,
	},
	btn:{
		marginTop: 25,
		backgroundColor: "rgba(92, 99,216, 1)",
    	width: 250,
    	height: 45,
    	borderColor: "transparent",
    	borderWidth: 0,
		borderRadius: 2,
		marginBottom: 15,
		
	},
	containerBtn:{
		flex:1,
		alignItems: 'center',
	}
});