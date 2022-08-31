package com.example.wheretogo.ui.home

import android.content.Intent
import com.bumptech.glide.Glide
import com.example.wheretogo.BaseFragment
import com.example.wheretogo.data.remote.home.PopularEventResult
import com.example.wheretogo.databinding.FragmentPopularBannerBinding
import com.example.wheretogo.ui.detail.DetailActivity

class BannerPopularFragment(private val item: PopularEventResult) : BaseFragment<FragmentPopularBannerBinding>(
    FragmentPopularBannerBinding::inflate) {

    override fun initAfterBinding() {
        binding.homePopularTitleTv.text = item.eventName
        binding.homePopularSavedCountTv.text = String.format("담은 수: %d건",item.savedNum)

        binding.homePopularTagTv.text=item.kind

        binding.homePopularStartDateTv.text = String.format("%s~",item.startDate.slice(IntRange(0,9)))
        if (item.endDate!=null)
            binding.homePopularEndDateTv.text = item.endDate.slice(IntRange(0,9))
        Glide.with(this).load(item.pic).into(binding.homePopularIv)

        binding.homePopularIv.setOnClickListener {
            val intent = Intent(context, DetailActivity::class.java)
            intent.putExtra("eventIdx", item.eventID)
            startActivity(intent)
        }
    }

}