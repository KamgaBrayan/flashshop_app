import firebase from "firebase";
require("firebase/firebase-auth");

import { USER_STATE_CHANGE } from "../constants";

export const userAuthStateListener = () => dispatch => {
    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            dispatch(getCurrentUserData())
        }else{
            dispatch({type: USER_STATE_CHANGE, currentUser: null, loaded: true})
        }
    })

}

export const getCurrentUserData = () => dispatch => {
    firebase.firestore()
        .collection('user')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((res) => {
            if(res.exist){
                return dispatch({
                    type: USER_STATE_CHANGE,
                    currentUser: res.data(),
                    loaded: true
                })
            }
        })
}


/**
 * Logs a user in to Firebase using their email and password. Returns a new Promise:
 * - Resolves if login is successful
 * - Rejects if login fails
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Promise indicating the success or failure of the login operation
 */
export const login = (email, password) => dispatch => new Promise((resolve, reject)  => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() =>{
        resolve()
    })
    .catch(() => {
        reject()
    })
})

export const register = (email, password) => dispatch => new Promise((resolve, reject)  => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() =>{
        resolve()
    })
    .catch(() => {
        reject()
    })
})