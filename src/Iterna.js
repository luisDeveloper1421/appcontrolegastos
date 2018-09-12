import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Button, Icons, Text } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation';
import Timeline from 'react-native-timeline-listview';

import firebase from './ConectionFirebase';
import CardDeDespesas from './CardDeDespesas';

export default class Iterna extends Component {

	static navigationOptions = {
		title: null,
		header: null
	}

	constructor(props) {
		super(props);
		this.state = { despesas: [], saldo: '' };

		this.sair = this.sair.bind(this);
		this.adicionarDespesa = this.adicionarDespesa.bind(this);
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				firebase.database().ref('SaldoUsuario').child(user.uid).on('value', (snapshot) => {
					let state = this.state;
					state.saldo = snapshot.val().saldo
					this.setState(state)
				});
				let state = this.state;

				firebase.database().ref('despesas').child(user.uid).on('value', (snapshot) => {
					state.despesas = new Array();
					snapshot.forEach((item) => {
						state.despesas.push({
							key: item.key,
							time: item.val().time,
							title: item.val().title,
							description: item.val().description,
							circleColor: item.val().circleColor,
							lineColor: item.val().lineColor,
						})
					})
					this.setState(state);
				})
			} else {
				this.props.navigation.dispatch(StackActions.reset({
					index: 0,
					actions: [
						NavigationActions.navigate({ routeName: 'Home' })
					]
				}));
				//this.props.navigation.navigate('Home');
			}
		});
	}


	adicionarDespesa() {
		this.props.navigation.navigate('Adicionar');
	}

	sair() {
		firebase.auth().signOut();
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.headerSaldo}>
					<Text style={styles.textHeaderSaldo}>Gastos no Mês R$: {this.state.saldo}</Text>
				</View>
				<Timeline
					style={styles.list}
					data={this.state.despesas}
					circleSize={20}
					circleColor='rgb(45,156,219)'
					lineColor='rgb(45,156,219)'
					timeContainerStyle={{ minWidth: 32, marginTop: 0 }}
					timeStyle={{ textAlign: 'center', backgroundColor: '#7fdecf', color: 'white', padding: 5, borderRadius: 10 }}
					descriptionStyle={{ color: 'gray' }}
					options={{
						style: { paddingTop: 5 }
					}}
					innerCircle={'dot'}
					separator={true}
					onEventPress={() => alert('estamos trabalhando...')}
				/>
				<Button
					title='Adicionar Despesa'
					buttonStyle={styles.btn}
					onPress={this.adicionarDespesa}
				/>
				<Button
					title='Sair'
					buttonStyle={styles.btn}
					onPress={this.sair}
				/>
			</View>
		);
	}
}



const styles = StyleSheet.create({
	containerSair: {
		flex: 1,
	}, btn: {
		margin: 10,
		borderRadius: 4,
		padding: 20,
		fontSize: 18,
		fontWeight: '700',
		backgroundColor: '#459d8e',
		borderColor: "transparent",
		borderWidth: 0,
	},
	container: {
		flex: 1,
		padding: 15,
		backgroundColor: '#d4f4ef'
	},
	list: {
		flex: 1,
		height: 400
	},
	headerSaldo: {
		borderBottomWidth: 1,
		borderBottomColor: "#dddddd",
		paddingBottom: 15
	},
	textHeaderSaldo: {
		fontSize: 20,
		fontWeight: '700',
		paddingLeft: 8
	}
});