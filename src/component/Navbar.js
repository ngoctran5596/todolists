import React, { useState, useContext } from 'react'
import { StyleSheet, Modal, Text, TextInput, Image, Pressable, Alert, View, Button, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react';
import { useFormik } from 'formik';

import * as yup from 'yup';

// import listStore from '../store/ListStore';
import ButtonText from './Button/ButtonCustom';
import { useStore } from '../App';
import ImagePicker from 'react-native-image-crop-picker';
import { PICKERIMAGE, PRIORITY, SORT } from '../assets/image';

const initialValues = {
    title: "",
    priority: "",
    path: ""
};

const Navbar = () => {
    const [isModal, setModal] = useState(false);

    const { taskStore: { addList, sortLists } } = useStore();

    const ValidationSchema = yup.object().shape({
        title: yup.string()
            .min(3, ({ min }) => `Task must be at least ${min} characters`)
            .required('Title is Required'),
        priority: yup.string()
            .required('Priority is Required'),
        path: yup.string()
            .required('Path is Required'),
    });

    const handlePickerCamera = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setFieldValue('path', image.path);
        }).catch(() =>
            setFieldTouched('path', true)
        );
    }

    const {
        values,
        isValid,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        setFieldError,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormik({
        initialValues,
        initialErrors: { title: true, priority: true, path: true },
        validationSchema: ValidationSchema,
        onSubmit: (values, { resetForm }) => {
            prepareAddList(values)
            resetForm();
        }

    });

    const prepareAddList = (e) => {
        addList(e)
    }

    const selectLevel = (value) => {
        setFieldValue('priority', value);
        closeModal();
        setFieldTouched('priority', false);
    }



    const openModal = () => {
        setModal(true);
        setFieldTouched('priority', true);
    }

    const closeModal = () => {
        setModal(false);
        setFieldTouched('priority', true)
    }



    return (

        <View >
            <View style={styles.container}>
                <TextInput
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                    style={styles.textInput}
                    placeholder="Title"
                />
                {errors && touched && errors.title && touched.title
                    ? <Text style={styles.error}>{errors.title}</Text>
                    : null
                }
            </View>
            <ButtonText
                sourceImage={PRIORITY}
                title={
                    values.priority
                        ? values.priority
                        : 'Select priority'
                }
                onPress={() => openModal()}
            />

            {errors.priority && touched.priority
                ? <Text style={styles.error}>{errors.priority}</Text>
                : null
            }
            <ButtonText
                sourceImage={PICKERIMAGE}
                title="Select image"
                onPress={handlePickerCamera}
            />
            {
                values?.path
                    ?
                    <Image
                        source={{ uri: values.path }}
                        resizeMode="contain"
                        style={styles.image}
                        alt="Avatar me"
                    />
                    : null
            }

            {errors && touched && errors.path && touched.path
                ? <Text style={styles.error}>{errors.path}</Text>
                : null
            }




            <View >

                <View style={styles.wrapperBtn}>
                    <TouchableOpacity
                        style={[styles.btnAdd, styles.btnSort]}
                        onPress={sortLists}
                    >
                        <Image source={SORT} style={styles.imageBtn} />
                        <Text style={styles.text}>Sort</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={!isValid}
                        style={[styles.btnAdd, !isValid && styles.disabledBtn]}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.text}>Add Task</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <Modal
                animationType="slide"
                transparent={true}
                visible={isModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.headerModal}>
                            <Text style={styles.textHeader}>Priority</Text>
                            <TouchableOpacity onPress={closeModal} style={styles.btnCancel}>
                                <Text>X</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={() => selectLevel('Importance')}>
                            <Text style={styles.modalText}>Importance</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => selectLevel('Normal')}>
                            <Text style={styles.modalText}>Normal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>


        </View>



    )
}

export default observer(Navbar)

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: '#cacaca',
        marginBottom: 10,
        // width: '95%',
        borderRadius: 8,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 8,
        fontSize: 16,
        height: 60
    },
    image: {
        width: 100,
        height: 100
    },

    imageBtn: {
        width: 20,
        height: 20,
        marginRight: 5,
        tintColor: 'white',
    },

    wrapperBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 15,
        // marginRight:10
    },
    btnCancel: {
        borderColor: "#cacaca",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 10
    },
    btnAdd: {
        width: 150,
        height: 40,
        borderRadius: 8,
        backgroundColor: "#74992e",
        justifyContent: 'center',
        alignItems: 'center'
    },

    btnSort: {
        borderRadius: 8,
        backgroundColor: "#74992e",
        flexDirection: 'row',
        marginRight:5
    },

    disabledBtn: {
        backgroundColor: "#ccc",
    },

    text: {
        color: "#ffff",
        fontWeight: 'bold',
        fontSize: 16,

    },
    error: {
        color: '#ff0000',
        fontSize: 12,
        marginLeft: 6,
        marginBottom: 10,
    },


    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 30,
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        marginTop: 15,
        borderRadius: 20,
        padding: 12,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    btn: {
        borderColor: "#cacaca",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },
    headerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,

    },
    textHeader: {
        fontSize: 18,
        fontWeight: 'bold',
    }


})