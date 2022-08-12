package com.example.wheretogo.ui.home

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.example.wheretogo.R
import com.example.wheretogo.data.remote.PopularEventResult
import com.example.wheretogo.databinding.FragmentEventBannerBinding
import com.example.wheretogo.ui.detail.DetailActivity
import com.example.wheretogo.ui.guide.GuideActivity

class HomeEventFragment(private val item: PopularEventResult) : Fragment() {
    lateinit var binding : FragmentEventBannerBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentEventBannerBinding.inflate(inflater,container,false)

        binding.homeEventTitleTv.text = item.eventName
        binding.homeEventTagTv.text = String.format("#%s #%s #%s",item.hashtag1,item.hashtag2,item.hashtag3)
        binding.homeEventStartDateTv.text = item.startDate.slice(IntRange(0,9))
        if (item.endDate!=null)
            binding.homeEventEndDateTv.text = item.endDate.slice(IntRange(0,9))
        binding.homeEventIv.setOnClickListener {
            saveIdx(item.eventID)
            startActivity(Intent(context, DetailActivity::class.java))
        }

        return binding.root
    }

    private fun saveIdx(eventId: Int){
        val spf = activity?.getSharedPreferences("eventInfo", AppCompatActivity.MODE_PRIVATE)
        val editor = spf?.edit()

        editor?.putInt("eventId",eventId)
        editor?.apply()
    }
}