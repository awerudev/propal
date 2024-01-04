import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#f0f0f0'
    },
    // ... [rest of the styles remain unchanged]
    cardHeaderContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardHeaderRow: {
        flexDirection: 'row',
        marginLeft: 15,
        backgroundColor: 'red'
    },
    cardHeaderIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 20
    },
    centerContainer: {
        padding: 10,
        alignItems: 'center',
        marginTop: 30
    },
    startWorkoutCard: {
        marginBottom: 30,
        backgroundColor: '#CDD6FF',
    },
    mealLogCard: {
        marginBottom: 30,
        backgroundColor: '#F2F2F2'
    },
    workoutHistoryCard: {
        marginBottom: 30,
        backgroundColor: '#F34D56'
    },
    footerRow: {
        flexDirection: 'row',
        width: '40%'
    },
    homeButton: {
        width: '20%',
        paddingVertical: 10,
        bottom: 20,
        backgroundColor: '#DAE3FF',
        borderRadius: '50%',
        height: 80
    },
    startButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    footerItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        width: '50%',
        height: 50,
    },
    mainText: {
        color: '#3F51B5',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 5,
    },
    footerText: {
        color: '#1579FF',
    },
    menuText: {
        color: 'white',
        fontSize: '18px',
        padding: 5,
        marginLeft: 5,
        borderBottom: 'black',
    },
    menuButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: -35,
        width: 110,
    },
    logo: {
        width: 40,
        height: 40,
    },
    chooseExercise: {
        backgroundColor: '#222',
        padding: 10,
        borderRadius: 10,
        width: 100,
        height: 90,
        alignItems: 'center',
    },
    main: {
        backgroundColor: 'red'
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        height: 160,
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
    },
    cardHeader: {
        backgroundColor: 'white',
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 'auto',
        justifyContent: 'space-between',
        width: '100%',
        height: 70,
        backgroundColor: '#fff',
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
    }

});

export default styles;
