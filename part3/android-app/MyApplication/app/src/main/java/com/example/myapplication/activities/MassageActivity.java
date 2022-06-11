package com.example.myapplication.activities;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import com.example.myapplication.AppDB;
import com.example.myapplication.GlobalInfo;
import com.example.myapplication.Message;
import com.example.myapplication.MessageDao;
import com.example.myapplication.R;
import com.example.myapplication.api.ChatAPI;

import java.util.List;

public class MassageActivity extends AppCompatActivity {
    private AppDB db;

    private MessageDao messageDao;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_massage);

        GlobalInfo gi =(GlobalInfo) getApplicationContext();

        db = Room.databaseBuilder(getApplicationContext(), AppDB.class, "AppDB")
                .allowMainThreadQueries()
                .build();
        messageDao = db.messageDao();

        ChatAPI chatAPI = new ChatAPI();
        chatAPI.getAllMessagesWithContact(gi.getContact(), new ChatAPI.responseMessagesCallbacks() {
            @Override
            public void onSuccess(List<Message> messages) {
                // recieve all messages from user and contact.
                // TODO: save given messages locally and display it to user in UI.
                for (Message m:
                     messages) {
                    messageDao.insert(m);
                };
            }

            @Override
            public void onFailure() {
                // TODO: report failed request to server (UI element of some kind?)?
            }
        });
    }
}