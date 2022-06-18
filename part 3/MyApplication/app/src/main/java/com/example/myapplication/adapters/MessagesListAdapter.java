package com.example.myapplication.adapters;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.DrawableContainer;
import android.os.Build;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.DrawableRes;
import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.widget.DrawableUtils;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.example.myapplication.GlobalInfo;
import com.example.myapplication.Message;
import com.example.myapplication.R;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class MessagesListAdapter extends RecyclerView.Adapter<MessagesListAdapter.MessagesViewHolder> {
    private static final int TYPE_SENT = 0;
    private static final int TYPE_RECIEVED = 1;
    class MessagesViewHolder extends RecyclerView.ViewHolder{
        private final TextView content;
        private final TextView lastDate;
        private boolean isSent;

        private MessagesViewHolder(View itemView){
            super(itemView);
            content = itemView.findViewById(R.id.messageContent);
            lastDate = itemView.findViewById(R.id.messageLastDate);
        }
    }
    private final LayoutInflater mInflater;
    private List<Message> messages;

    public MessagesListAdapter(Context context){
        mInflater = LayoutInflater.from(context);
    }
    @NonNull
    @Override
    public MessagesViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (viewType == TYPE_SENT) {
            View itemView = mInflater.inflate(R.layout.activity_massage2, parent, false);
            // View itemView = mInflater.inflate(R.layout.activity_massage2,parent,false);
            return new MessagesViewHolder(itemView);
        }else{
            View itemView = mInflater.inflate(R.layout.message_item, parent, false);
            // View itemView = mInflater.inflate(R.layout.activity_massage2,parent,false);
            return new MessagesViewHolder(itemView);
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onBindViewHolder(@NonNull MessagesViewHolder holder, int position) {
        if(messages != null){
            final Message current = messages.get(position);
            holder.content.setText(current.getContent());
            String date=current.getCreated();
            LocalDateTime myDateObj = LocalDateTime.parse(date);
            DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("HH:mm");
            String formattedDate = myDateObj.format(myFormatObj);
            holder.lastDate.setText(formattedDate);
            holder.isSent = current.isSent();
            // change how message look.
            /*
            if(holder.isSent){
                Drawable background = ContextCompat.getDrawable(GlobalInfo.context, R.drawable.background_other_massage);
                holder.msgLayoutBackground.setBackground(background);
            }else{
                Drawable background = ContextCompat.getDrawable(GlobalInfo.context, R.drawable.background_other2_massage);
                holder.msgLayoutBackground.setBackground(background);
            }*/
        }
    }

    @Override
    public int getItemCount() {
        if(messages != null)
            return messages.size();
        else return 0;
    }

    @Override
    public int getItemViewType(int position) {
        final Message current = messages.get(position);
        return current.isSent() ? TYPE_SENT : TYPE_RECIEVED;
    }

    public void setMessages(List<Message> messages){
        this.messages = messages;
        notifyDataSetChanged();
    }

}
