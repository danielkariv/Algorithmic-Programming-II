package com.example.myapplication.adapters;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.text.Layout;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;
import android.widget.TextView;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
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
        private String serverAddress;
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
                    gi.setContactServer(serverAddress);
                    onClickListener.onClick(view);
                }
            });
            itemView.setOnTouchListener(new View.OnTouchListener() {
                @Override
                public boolean onTouch(View view, MotionEvent motionEvent) {
                    itemView.setBackgroundColor(0xFFFAFAFA);
                    if (motionEvent.getAction() ==MotionEvent.ACTION_CANCEL)
                        itemView.setBackgroundColor(0xFFFFFFFF);
                    return false;
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

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onBindViewHolder(@NonNull ContactsViewHolder holder, int position) {
        if(contacts != null){
            final Contact current = contacts.get(position);
            holder.displayName.setText(current.name);
            holder.lastText.setText(current.last);
            String date=current.lastdate;
            if (date != null) {
                LocalDateTime myDateObj = LocalDateTime.parse(date);
                LocalDateTime now = LocalDateTime.now();
                DateTimeFormatter df = DateTimeFormatter.ofPattern("dd.MM.yyy");
                if (now.format(df).equals(myDateObj.format(df))) {
                    DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("HH:mm");
                    String formattedDate = myDateObj.format(myFormatObj);
                    holder.lastDate.setText(formattedDate);
                }
                else
                {
                    holder.lastDate.setText(myDateObj.format(df));
                }
            }
            else{
                // date is null, meaning no message has been sent yet to/from contact.
                holder.lastDate.setText("");
            }
            holder.contactId = current.getId();
            holder.serverAddress = current.server;
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
