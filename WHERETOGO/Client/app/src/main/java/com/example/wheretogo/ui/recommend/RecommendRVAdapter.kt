package com.example.wheretogo.ui.recommend

import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View

import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.bumptech.glide.load.resource.bitmap.CenterCrop
import com.bumptech.glide.load.resource.bitmap.RoundedCorners
import com.example.wheretogo.R
import com.example.wheretogo.data.remote.auth.getRetrofit
import com.example.wheretogo.data.remote.home.AllRecommendEventResult
import com.example.wheretogo.data.remote.mypage.EventStatusResponse
import com.example.wheretogo.data.remote.mypage.MypageRetrofitInterface
import com.example.wheretogo.databinding.ItemAllRecommendBinding
import com.example.wheretogo.databinding.ItemMypageSavedBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class RecommendRVAdapter(private val recommendList: ArrayList<AllRecommendEventResult>): RecyclerView.Adapter<RecommendRVAdapter.ViewHolder>() {
    private lateinit var context: Context
    private var isEventVisited=false
    private var isEventSaved=false
    private val service = getRetrofit().create(MypageRetrofitInterface::class.java)
    private lateinit var mItemClickListener: RecommendRVAdapter.OnItemClickListener

    interface OnItemClickListener {
        fun onItemClick(allRecommendData: AllRecommendEventResult)
    }

    fun setMyItemClickListener(itemClickListener: OnItemClickListener) {
        mItemClickListener = itemClickListener
    }

    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int
    ): RecommendRVAdapter.ViewHolder {
        context= viewGroup.context
        val binding: ItemAllRecommendBinding = ItemAllRecommendBinding.inflate(LayoutInflater.from(viewGroup.context), viewGroup, false)

        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: RecommendRVAdapter.ViewHolder, position: Int) {
        holder.bind(recommendList.get(position)) //position=indexid 받아온 뷰홀더에 바인딩을 해주기 위해 해당 포지션의 데이터를 던져줌
        holder.binding.itemRecommendLikeFrame.setOnClickListener {
            mItemClickListener.onItemClick(recommendList[position])
        }
    }


    inner class ViewHolder(val binding: ItemAllRecommendBinding): RecyclerView.ViewHolder(binding.root){

        fun bind(allRecommendEvent: AllRecommendEventResult){

            if (allRecommendEvent.pic!=null){
                Glide.with(context).load(allRecommendEvent.pic)
                    .transform(CenterCrop(), RoundedCorners(40))
                    .into(binding.itemRecommendEventIv)
            }
            else{binding.itemRecommendEventIv.setImageResource(R.drawable.default_event_img)
                binding.itemRecommendEventIv.clipToOutline = true
            }
            binding.itemRecommendTitleTv.text = allRecommendEvent.eventName
            binding.itemRecommendDateTv.text = String.format("%s ~ %s",allRecommendEvent.startDate.slice(
                IntRange(0,9)),allRecommendEvent.endDate.slice(IntRange(0,9)))
            binding.itemRecommendTagTv.text = allRecommendEvent.kind
            binding.itemRecommendLikeCountTv.text = String.format("해당 그룹 저장 수: %d건",allRecommendEvent.userTopNum)

            getEventStatus(allRecommendEvent.eventID, binding)



        }
}

    override fun getItemCount(): Int {
        return recommendList.size
    }

    private fun getEventStatus(eventId: Int, binding: ItemAllRecommendBinding){
        val userId = getIdx()
        service.getEventStatus(userId,eventId).enqueue(object:
            Callback<EventStatusResponse> {
            override fun onResponse(call: Call<EventStatusResponse>, response: Response<EventStatusResponse>) {
                val resp = response.body()!!
                when(resp.code){
                    200->{
                        if (resp.isVisited){
                            binding.itemRecommendVisitedBtn.visibility = View.VISIBLE
                            binding.itemRecommendUnvisitedBtn.visibility = View.INVISIBLE
                        }
                        else {
                            binding.itemRecommendVisitedBtn.visibility = View.INVISIBLE
                            binding.itemRecommendUnvisitedBtn.visibility = View.VISIBLE
                        }

                        if (resp.isSaved){
                            binding.itemRecommendLikeBtn.visibility = View.VISIBLE
                            binding.itemRecommendUnlikeBtn.visibility = View.INVISIBLE
                        }
                        else{
                            binding.itemRecommendLikeBtn.visibility = View.INVISIBLE
                            binding.itemRecommendUnlikeBtn.visibility = View.VISIBLE
                        }
                    }
                }
            }
            override fun onFailure(call: Call<EventStatusResponse>, t: Throwable) {
            }
        })
    }

    //유저 인덱스 가져옴
    private fun getIdx(): Int {
        val spf = context.getSharedPreferences("userInfo", AppCompatActivity.MODE_PRIVATE)
        return spf!!.getInt("userIdx",-1)
    }
}