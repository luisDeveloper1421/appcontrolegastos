import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from './ConectionFirebase'

export default class Login extends Component {


	static navigationOptions = ({ navigate, navigation }) => ({
		title: 'Login',
		headerStyle: {
			backgroundColor: '#37b8a7'
		}, headerTintColor: "#fff",
		headerLeft: <TouchableOpacity
		style={{paddingLeft:15}}
					onPress={() => { navigation.navigate('Cadastro'); }} 
					>
			<Icon
				name='arrow-left'
				type='font-awesome'
				color='#fff'
				size={19}
				underlayColor="#fff"
			/>
		</TouchableOpacity>,
	})

	constructor(props) {
		super(props);
		this.state = { email: '', senha: '' };
		this.logar = this.logar.bind(this);
		firebase.auth().signOut();
	}

	logar() {
		if (this.state.email != '' && this.state.senha != '') {
			firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					this.props.navigation.navigate('Iterna');
				}
			})

			firebase.auth().signInWithEmailAndPassword(
				this.state.email,
				this.state.senha
			)
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<FormLabel labelStyle={{ fontSize: 15 }}>Email</FormLabel>
				<FormInput inputStyle={{ paddingLeft: 5 }} onChangeText={(email) => this.setState({ email })} />

				<FormLabel labelStyle={{ marginTop: 25, fontSize: 15 }}>Senha</FormLabel>
				<FormInput inputStyle={{ paddingLeft: 5 }} secureTextEntry={true} onChangeText={(senha) => this.setState({ senha })} />
				<View style={styles.containerBtn}>
					<Button
						title="Entrar"
						titleStyle={{ fontWeight: "700" }}
						buttonStyle={styles.btn}
						onPress={this.logar}
					/>
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	btn: {
		marginTop: 25,
		backgroundColor: "rgba(92, 99,216, 1)",
		width: 250,
		height: 45,
		borderColor: "transparent",
		borderWidth: 0,
		borderRadius: 2,
		marginBottom: 15,

	},
	containerBtn: {
		flex: 1,
		alignItems: 'center',
	}
});