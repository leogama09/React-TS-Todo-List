import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import {useState, useEffect} from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    // register
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {

        const {user} = await createUserWithEmailAndPassword (
            auth,
            data.email,
            data.password
        )

        await updateProfile(user,{
            displayName: data.displayName
        })

        setLoading(false)

        return user

        } catch (error) {

            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if(error.message.includes("Password")) {
                systemErrorMessage = "Password should be at least 6 characters."
            } else if(error.message.includes("email-already")) {
                systemErrorMessage = "E-mail already registered."
            } else {
                systemErrorMessage = "There was an error, try again later."
            }

            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    //logout
    const logout = () => {
        checkIfIsCancelled()

        signOut(auth)
    }

    //login
    const login = async(data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(false)

        try {

            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } catch (error) {
            let systemErrorMessage

            if(error.message.includes("user-not-found")) {
                systemErrorMessage = "User not found"
            } else if(error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta"
            } else {
                systemErrorMessage = "There was an error, please try again later."
            }

            setError(systemErrorMessage)
            setLoading(false)
    }

}

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    }
}