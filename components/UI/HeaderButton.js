import React from 'react';
import {View,Text,StyleSheet,Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../constants/Colours';

const CustomHeaderButton = props => {
    return( <HeaderButton {...props}
        IconComponent= {Ionicons}
        iconSize={23}
        color={Platform.OS==='android'?'white':Colors.primaryColor}
     />
    )
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CustomHeaderButton;