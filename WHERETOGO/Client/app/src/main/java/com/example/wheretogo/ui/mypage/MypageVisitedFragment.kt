package com.example.wheretogo.ui.mypage

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.wheretogo.BaseFragment
import com.example.wheretogo.R
import com.example.wheretogo.data.entities.userSavedEvent
import com.example.wheretogo.data.remote.mypage.MypageService
import com.example.wheretogo.data.remote.mypage.VisitedEventResult
import com.example.wheretogo.databinding.FragmentMypageBannerBinding
import com.example.wheretogo.ui.detail.DetailActivity

class MypageVisitedFragment() : BaseFragment<FragmentMypageBannerBinding>(FragmentMypageBannerBinding::inflate){
    private val mypageService = MypageService
    override fun initAfterBinding() {


        mypageService.getVisitedEvent(this)
    }

    fun setVisitedEvent(visitedEventList: ArrayList<VisitedEventResult>){
        val adapter = UserVisitedEventRVAdapter(visitedEventList)
        //리사이클러뷰에 어댑터 연결
        binding.mypageLikeRv.adapter = adapter
        binding.mypageLikeRv.layoutManager = LinearLayoutManager(context,
            LinearLayoutManager.VERTICAL,false)

        binding.mypageExplainTv.text = "내가 다녀온 행사들이에요."

        adapter.setMyItemClickListener(object : UserVisitedEventRVAdapter.OnItemClickListener {
            override fun onItemClick(visitedEventData: VisitedEventResult) {
                saveIdx(visitedEventData.eventID)
                val intent = Intent(context, DetailActivity::class.java)
                startActivity(intent)
            }
        })
    }

    private fun saveIdx(eventId: Int){
        val spf = activity?.getSharedPreferences("eventInfo", AppCompatActivity.MODE_PRIVATE)
        val editor = spf?.edit()

        editor?.putInt("eventId",eventId)
        editor?.apply()
    }




}