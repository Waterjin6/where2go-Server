package com.example.wheretogo.ui.setting

import android.content.Intent
import com.example.wheretogo.databinding.ActivitySettingBinding
import com.example.wheretogo.ui.BaseActivity
import com.example.wheretogo.ui.keyword.KeywordActivity

class SettingActivity: BaseActivity<ActivitySettingBinding>(ActivitySettingBinding::inflate) {
    override fun initAfterBinding() {
        binding.settingChangeNickname.setOnClickListener {
            startNextActivity(ChangeInfoActivity::class.java)
        }
        binding.settingGetInfo.setOnClickListener{
            if (binding.settingGetInfo.text == "OFF"){
                binding.settingGetInfo.text = "ON"
            }
            else{
                binding.settingGetInfo.text ="OFF"
            }
        }
        binding.settingBackTv.setOnClickListener {
            finish()
        }

        binding.uploadKeyword.setOnClickListener{
            startNextActivity(KeywordActivity::class.java)
        }

    }
}