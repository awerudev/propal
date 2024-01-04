const styles = {
    container: {
        flex: 1,
    },
    header: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        alignItems: 'center',
        textAlign: 'center',
    },
    closeButton: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
        top: -10,
        left: -10,
    },
    addButton: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
    },
    searchBar: {
        justifyContent: 'center',
        width: '70%',
        height: 30,
        fontSize: 14,
        borderRadius: 10,
        color: '#878787',
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: '#999'
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        backgroundColor: '#111'
    },
    categoryButton: {
        backgroundColor: '#333',
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    categoryButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
    },
    exercisesContainer: {
        flex: 1,
        padding: 10,
        paddingHorizontal: 50,
        borderRadius: 10,
        marginHorizontal: 10,
        width: '95%',
    },
    exercise: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#333',
        paddingVertical: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    exerciseName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
    },
    searchContainer: {
        paddingVertical: 5
    },
    muscleContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        width: '100%'
    },
    chest: {
        /*flex: 1,
        flexDirection: 'row',*/
        backgroundColor: '#C58BF2',
        paddingVertical: 10,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: '#C58BF2',
        borderRadius: 25,
        width: '100%'
    },
    chestFilter: {
        backgroundColor: '#222',
        padding: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: '#ec111a',
        borderRadius: 25,
    },
    chestText: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
    },
    back: {
        backgroundColor: '#FCBB62',
        padding: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: '#FCBB62',
        borderRadius: 25,
    },
    backText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
    legs: {
        backgroundColor: '#FF8383',
        padding: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: '#FF8383',
        borderRadius: 25,
    },
    legsText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
    shoulders: {
        backgroundColor: '#40E759',
        padding: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: '#40E759',
        borderRadius: 25,
    },
    shouldersText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
    biceps: {
        backgroundColor: '#ffba01',
        padding: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: '#ffba01',
        borderRadius: 25,
        marginRight: 15
    },
    bicepsText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
    triceps: {
        backgroundColor: '#A74EEC',
        padding: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: '#A74EEC',
        borderRadius: 25,
    },
    tricepsText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
    core: {
        backgroundColor: '#00C1FF',
        padding: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: '#00C1FF',
        borderRadius: 25,
    },
    coreText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
    generic: {
        backgroundColor: '#333',
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
    },
    genericText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
    },
    chooseExercise: {
        backgroundColor: 'red'
    },
    exerciseTextHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#333',
        paddingLeft: 20
    },
    searchHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        placeholderTextColor: 'black'
    },
    lastItem: {
        marginBottom: 20
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 200
    },
    modalContent: {
        backgroundColor: '#F8F6F7',
        width: 260,
        height: 280,
        padding: 20,
        borderRadius: 10,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        color: '#fff',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    input: {
        color: 'black',
        height: 50,
        width: '95%',
        marginVertical: 10,
        borderRadius: 25,
        paddingHorizontal: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        shadowColor: "#000", // This is your box shadow color
        shadowOffset: {
            width: 0,   // These are your box shadow offsets
            height: 2,
        },
        shadowOpacity: 0.23,  // This is your box shadow opacity
        shadowRadius: 2.62,  // This is your box shadow radius
        elevation: 4,  // This adds shadow to Android and needs to be used in conjunction with the above properties
    },
    saveButton: {
        backgroundColor: '#3F51B5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        borderRadius: 25,
        width: '40%',
        marginRight: 5,
        marginLeft: 'auto'
    },
    saveButtonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    inputsModule: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        color: 'red'
    },
    modalOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.5,
    },
    push: {
        backgroundColor: '#FFA726',
        padding: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: '#FFA726',
        borderRadius: 25,
    },
    pushText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },

    pull: {
        backgroundColor: '#4CAF50',
        padding: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: '#4CAF50',
        borderRadius: 25,
    },
    pullText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },

    upperBody: {
        backgroundColor: '#FF5252',
        padding: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: '#FF5252',
        borderRadius: 25,
    },
    upperBodyText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },

    lowerBody: {
        backgroundColor: '#448AFF',
        padding: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: '#448AFF',
        borderRadius: 25,
    },
    lowerBodyText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },

    cardio: {
        backgroundColor: '#7C4DFF',
        padding: 10,
        margin: 5,
        borderWidth: 2,
        borderColor: '#7C4DFF',
        borderRadius: 25,
    },
    cardioText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
};

export default styles;