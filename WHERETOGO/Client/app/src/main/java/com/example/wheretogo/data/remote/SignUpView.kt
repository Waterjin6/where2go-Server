package com.example.wheretogo.data.remote

interface SignUpView { //액티비티와 AuthService 연결
    fun onSignUpSuccess(message: String)
    fun onSignUpFailure(message: String)
}