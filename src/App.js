import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useContext, createContext, useState } from 'react'
import Navbar from './component/Navbar'
import ListDisplay from './component/ListDisplay'
import store from './store'
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { WebView } from 'react-native-webview';
import { HOME, WEB } from './assets/image'

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        window.ReactNativeWebView.postMessage('FROM_WEBVIEW');

        setTimeout(() => {
            window.ReactNativeWebView.postMessage('FROM_SETTIMEOUT');
        },3000);
    </script>
</head>
<body>
    <h1>Xin chao</h1>
</body>
</html>
`;

const MyWeb = () => {
    const runFirst =
        `
        document.body.style.backgroundColor = 'red';
   
        `;

    const onMessage = ({ nativeEvent }) => {
        console.log(nativeEvent?.data);
    }
    return (
        <WebView
            source={{ html }}
            style={{}}
            onMessage={onMessage}
        />
    );

}


const Context = createContext(store);
export const useStore = () => useContext(Context);

const App = () => {
    const [isSelect, setIsSelect] = useState(false);
    const [nameScreen, setNameScreen] = useState('home');

    const setIsHome = () => {
        setIsSelect('home');
        setNameScreen('home')
    }

    const setIsWeb = () => {
        setIsSelect('web');
        setNameScreen('web')
    }

    const SelectScreen = () => {
        return (
            <View style={styles.containerTab}>
                <TouchableOpacity style={[styles.btn, nameScreen === 'home' && styles.bgSelect]} onPress={setIsHome}>
                    <Image source={HOME} style={styles.img} />
                    <Text style={styles.text}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, nameScreen === 'web' && styles.bgSelect]} onPress={setIsWeb}>
                    <Image source={WEB} style={styles.img} />
                    <Text style={styles.text} >New Feed</Text>
                </TouchableOpacity>
            </View>
        )

    }

    const MyHomeScreen = () => {
        return (
            <View>
                <Navbar />
                <ListDisplay />
            </View>
        )

    }



    return (
        <Context.Provider value={store}>
            <View style={styles.container}>
                <SelectScreen />
                {
                    isSelect === "web"
                        ? <MyWeb />
                        : <MyHomeScreen />
                }
            </View>
        </Context.Provider>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    containerTab: {
        flexDirection: 'row',
        paddingVertical: 10,


    },
    img: {
        width: 24,
        height: 24,

    },
    text: {
        paddingHorizontal: 5
    },
    btn: {
        width: '49%',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginRight: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgSelect: {
        backgroundColor: '#94B49F'
    }
})