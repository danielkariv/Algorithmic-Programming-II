package com.example.myapplication.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.myapplication.Message;
import com.example.myapplication.R;

import java.util.List;

public class MessagesListAdapter extends RecyclerView.Adapter<MessagesListAdapter.MessagesViewHolder> {

    class MessagesViewHolder extends RecyclerView.ViewHolder{
        private final TextView content;
        private final TextView lastDate;
        private boolean isSent;

        private MessagesViewHolder(View itemView){
            super(itemView);

            content = itemView.findViewById(R.id.messageContent);
            lastDate = itemView.findViewById(R.id.messageLastDate);
            isSent = false;
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
        View itemView = mInflater.inflate(R.layout.message_item,parent,false);
        return new MessagesViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull MessagesViewHolder holder, int position) {
        if(messages != null){
            final Message current = messages.get(position);
            holder.content.setText(current.getContent());
            holder.lastDate.setText(current.getCreated());
            holder.isSent = current.isSent();
        }
    }

    @Override
    public int getItemCount() {
        if(messages != null)
            return messages.size();
        else return 0;
    }

    public void setMessages(List<Message> messages){
        this.messages = messages;
        notifyDataSetChanged();
    }

}
