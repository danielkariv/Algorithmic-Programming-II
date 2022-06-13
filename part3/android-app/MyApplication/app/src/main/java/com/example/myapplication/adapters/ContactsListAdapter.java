package com.example.myapplication.adapters;

import android.content.Context;
import android.content.Intent;
import android.text.Layout;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.myapplication.Contact;
import com.example.myapplication.GlobalInfo;
import com.example.myapplication.R;
import com.example.myapplication.activities.ContectsActivity;
import com.example.myapplication.activities.LogInActivity;
import com.example.myapplication.activities.MassageActivity;
import com.example.myapplication.activities.OptionActivity;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public class ContactsListAdapter extends RecyclerView.Adapter<ContactsListAdapter.ContactsViewHolder> {

    class ContactsViewHolder extends RecyclerView.ViewHolder{
        private final TextView displayName;
        private final TextView lastText;
        private final TextView lastDate;
        private String contactId;

        private ContactsViewHolder(View itemView){
            super(itemView);

            displayName = itemView.findViewById(R.id.contactDisplayName);
            lastText = itemView.findViewById(R.id.contactLastText);
            lastDate = itemView.findViewById(R.id.contactLastDate);
            contactId = "";
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    // set selected contactId (each row has it own contact it point to).
                    GlobalInfo gi = (GlobalInfo)GlobalInfo.context;
                    gi.setContact(contactId);
                    onClickListener.onClick(view);
                }
            });
        }
    }
    private final LayoutInflater mInflater;
    private List<Contact> contacts;
    private final View.OnClickListener onClickListener;

    public ContactsListAdapter(Context context, View.OnClickListener onclickevent){
        mInflater = LayoutInflater.from(context);
        onClickListener = onclickevent;
    }
    @NonNull
    @Override
    public ContactsViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = mInflater.inflate(R.layout.contact_item,parent,false);
        return new ContactsViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull ContactsViewHolder holder, int position) {
        if(contacts != null){
            final Contact current = contacts.get(position);
            holder.displayName.setText(current.name);
            holder.lastText.setText(current.last);
            holder.lastDate.setText(current.lastdate);
            holder.contactId = current.getId();
        }
    }

    @Override
    public int getItemCount() {
        if(contacts != null)
            return contacts.size();
        else return 0;
    }

    public void setContacts(List<Contact> contacts){
        this.contacts = contacts;
        notifyDataSetChanged();
    }

}
