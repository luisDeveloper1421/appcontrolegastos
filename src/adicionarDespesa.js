import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { FormLabel, FormInput, Button, Icons } from 'react-native-elements';
import firebase from './ConectionFirebase';

export default class AdicionarDespesa extends Component {

    static navigationOptions = {
        title: 'Voltar',
        headerStyle: {
            backgroundColor: '#459d8e'
        }, headerTintColor: "#fff"
    }
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            descricao: '',
            valor: ''
        };
        this.adicionar = this.adicionar.bind(this);
        this.retornar = this.retornar.bind(this);
    }

    adicionar() {
        if (this.state.nome != "" && this.state.valor != "") {
            let uid = firebase.auth().currentUser.uid;
            let key = firebase.database().ref('despesas').child(uid).push().key;
            let user = firebase.database().ref('SaldoUsuario').child(firebase.auth().currentUser.uid);

            firebase.database().ref('despesas').child(uid).child(key).set({
                time: new Date().toLocaleDateString(),
                title: this.state.nome,
                description: this.state.descricao,
                circleColor: "#009688",
                lineColor: "#009688"
            });

            user.once('value').then((snapshot) => {
                let saldo = parseFloat(snapshot.val().saldo);
                saldo += parseFloat(this.state.valor);

                user.set({
                    saldo: saldo
                })
            })
        } else {
            alert('os campos devem ser preenchidos!')
        }

        Alert.alert(
            'Sucesso',
            'Despesa adicionada com sucesso!',
            [
                { text: 'Retornar', onPress: this.retornar, style: 'cancel' },
                { text: 'Adicionar +', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        )
    }


    retornar() {
        this.props.navigation.goBack();
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <FormLabel labelStyle={{ fontSize: 15, marginTop: 20 }}>Nome da Despesa</FormLabel>
                    <FormInput inputStyle={{ paddingLeft: 5 }}
                        value={this.state.nome}
                        onChangeText={(nome) => this.setState({ nome })} />

                    <FormLabel labelStyle={{ fontSize: 15 }}>Descriçaõ da Despesa</FormLabel>
                    <FormInput inputStyle={{ paddingLeft: 5 }}
                        value={this.state.descricao}
                        onChangeText={(descricao) => this.setState({ descricao })} />

                    <FormLabel labelStyle={{ marginTop: 20, fontSize: 15 }}>Valor</FormLabel>
                    <FormInput inputStyle={{ paddingLeft: 5 }}
                        keyboardType="numeric"
                        value={this.state.valor}
                        onChangeText={(valor) => this.setState({ valor })} />

                    <View style={styles.containerBtn}>
                        <Button
                            title="Adicionar Gasto"
                            titleStyle={{ fontWeight: "700" }}
                            icon={{ name: 'attach-money' }}
                            buttonStyle={styles.btn}
                            onPress={this.adicionar}
                        />
                    </View>
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
        backgroundColor: "#459d8e",
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