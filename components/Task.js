import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons'

function Task({ children }) {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square}></TouchableOpacity>
                <Text style={styles.itemText}>{children}</Text>
            </View>
            <View>
                <FontAwesome name='edit' size={32} color='black' />
            </View>
        </View>
    );

}

export default Task;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 4,
        marginBottom: 20,
        marginHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#D9D9D9',
        borderRadius: 2,
        opacity: 0.7,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
    },

});