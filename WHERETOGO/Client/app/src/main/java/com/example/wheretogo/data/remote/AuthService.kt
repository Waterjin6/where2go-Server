package com.example.wheretogo.data.remote

import android.util.Log
import com.example.wheretogo.ui.login.LoginActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AuthService { //signupview 변수 받음
    private lateinit var signUpView: SignUpView
    private lateinit var loginView: LoginView
    val authService = getRetrofit().create(AuthRetrofitInterface::class.java)
//    val authService = retrofit.create(AuthRetrofitInterface::class.java)
    fun setSignUpView(signUpView: SignUpView){
        this.signUpView = signUpView
    }

    fun setLoginView(loginView: LoginActivity){
        this.loginView = loginView
    }
    fun signUp(signUpInfo: SignUpInfo){
        authService.signUp(signUpInfo).enqueue(object: Callback<SignUpResponse> {
            override fun onResponse(call: Call<SignUpResponse>, response: Response<SignUpResponse>) {
                Log.d("SIGNUP/SUCCESS",response.toString())
                val resp: SignUpResponse = response.body()!!
                when(resp.msg){
                    "The user has been registerd with us!" ->signUpView.onSignUpSuccess(resp.msg)
                    else ->{
                        signUpView.onSignUpFailure(resp.msg)
                        Log.d("SIGNUP/",resp.msg)
                    }
                }
                Log.d("resp",resp.msg)
            }

            override fun onFailure(call: Call<SignUpResponse>, t: Throwable) {
                Log.d("SIGNUP/FAILURE", t.message.toString())
            }

        })
        Log.d("SIGNUP","HELLO")
    }

    fun login(appLoginInfo: LoginInfo){
        authService.login(appLoginInfo).enqueue(object: Callback<LoginResponse>{

            override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                val resp: LoginResponse = response.body()!!
                Log.d("login/SUCCESS",response.toString())
                when(resp.msg){
                    "Logged in!" ->{
                        Log.d("login/S", resp.msg)
                        loginView.onLoginSuccess(resp.user!!)
                        Log.d("login/Success", response.body()!!.toString())}//액티비티에서 상태 처리
                    else ->{
                        Log.d("login/F", resp.msg)
                        loginView.onLoginFailure(resp.msg)
                    }
                }

            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                Log.d("login/Failure", "fail")
            }
        })
    }


}