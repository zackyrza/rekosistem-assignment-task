import { StyleSheet } from "react-native";

export default StyleSheet.create({
    parent: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 25,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    box: {
        margin: 24,
        padding: 24,
        height: 128,
        width: 128,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "darkseagreen",
    },
    list: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexBasis: '50%',
    },
    separator: {
        height: 10,
    },
    slotRow1: {
        top: 34,
        left: 29,
        width: '70%',
        height: 24,
        backgroundColor: 'rgba(116, 137, 241, 0.5)',
        position: 'absolute',
    },
    slotRow2: {
        top: 61,
        left: 20,
        width: '80%',
        height: 24,
        backgroundColor: 'rgba(116, 137, 241, 0.5)',
        position: 'absolute',
    },
    slotRow3: {
        top: 88,
        left: 15,
        width: '83%',
        height: 24,
        backgroundColor: 'rgba(116, 137, 241, 0.5)',
        position: 'absolute',
    },
    slotRow4: {
        top: 117,
        left: 20,
        width: '80%',
        height: 24,
        backgroundColor: 'rgba(116, 137, 241, 0.5)',
        position: 'absolute',
    },
    slotRow5: {
        top: 145,
        left: 29,
        width: '70%',
        height: 24,
        backgroundColor: 'rgba(116, 137, 241, 0.5)',
        position: 'absolute',
    },
});