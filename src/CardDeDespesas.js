import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class CardDeDespesas extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={Styles.container}>
                <Text>Estamos Trabalhando nessa pagina....</Text>
            </View>
        );
    };
};

const Styles = StyleSheet.create({
    container: {
        height: 100,
        width: 300,
        borderWidth: 1,
        backgroundColor: "#dddddd",
        borderColor: '#dddddd',
        borderRadius: 4,
        shadowColor: '#dddddd',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 4,
        shadowOpacity: 0.7,
        marginTop: 20,
        margin: 15
    }

})