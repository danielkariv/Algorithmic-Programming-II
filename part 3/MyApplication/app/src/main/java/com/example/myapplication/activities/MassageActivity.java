package com.example.myapplication.activities;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ScrollView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.room.Room;

import com.example.myapplication.AppDB;
import com.example.myapplication.Contact;
import com.example.myapplication.ContactsViewModel;
import com.example.myapplication.GlobalInfo;
import com.example.myapplication.Message;
import com.example.myapplication.MessageDao;
import com.example.myapplication.MessagesViewModel;
import com.example.myapplication.R;
import com.example.myapplication.adapters.ContactsListAdapter;
import com.example.myapplication.adapters.MessagesListAdapter;
import com.example.myapplication.api.ChatAPI;

import java.util.List;

public class MassageActivity extends AppCompatActivity {

    private AppDB db;
    private MessageDao messageDao;
    private MessagesViewModel viewModel;
    private ChatAPI.responseMessagesCallbacks callbacks;

    @Override
    protected void onCreate(Bundle savedInstanceState) {


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_massage);

        GlobalInfo gi =(GlobalInfo) getApplicationContext();
        TextView su= (TextView) findViewById(R.id.selectedusertext);
        su.setText(gi.getContact());
        db = Room.databaseBuilder(getApplicationContext(), AppDB.class, "AppDB")
                .allowMainThreadQueries()
                .build();
        messageDao = db.messageDao();

        viewModel = new ViewModelProvider(this).get(MessagesViewModel.class);

        RecyclerView messagesRecyclerView = (RecyclerView)findViewById(R.id.messageslist);
        final MessagesListAdapter adapter = new MessagesListAdapter(this);
        messagesRecyclerView.setAdapter(adapter);
        messagesRecyclerView.setLayoutManager(new LinearLayoutManager(this));

        viewModel.getMessages().observe(this, new Observer<List<Message>>() {
            @Override
            public void onChanged(List<Message> messages) {
                adapter.setMessages(messages);
                messagesRecyclerView.scrollToPosition(adapter.getItemCount()-1);
            }
        });
        // load what we got locally.
        viewModel.getMessages().setValue(messageDao.index());


        // get updated messages list from server, will update automatically.
        ChatAPI chatAPI = new ChatAPI();

        callbacks = new ChatAPI.responseMessagesCallbacks() {
            @Override
            public void onSuccess(List<Message> messages) {
                Log.d("ContactsActivity","Success when get all contacts");
                // remove old contacts
                messageDao.nuke();
                // add new contacts to local database.
                for (Message c:messages) {
                    messageDao.insert(c);
                }
                // load data from local database to 'contactlist'
                viewModel.getMessages().setValue(messageDao.index());
            }

            @Override
            public void onFailure() {
                // TODO: report to user when failed to load contacts (UI element?)?

                Log.d("ContactsActivity","Failure when get all contacts");
            }
        };
        chatAPI.getAllMessagesWithContact(gi.getContact(), callbacks);

        // sending message logic.
        Button sendmsgbutton = (Button)findViewById(R.id.sendmsg);
        Button backbutton = (Button)findViewById(R.id.backtocontects);
        backbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent= new Intent(MassageActivity.this,ContectsActivity.class);
                startActivity(intent);
            }
        });
        EditText msgedittext = (EditText) findViewById(R.id.msgedit);
        sendmsgbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String text = msgedittext.getText().toString();
                chatAPI.addMessageWithContact(gi.getContact(), text, new ChatAPI.responseCallbacks() {
                    @Override
                    public void onSuccess() {
                        chatAPI.trasnfer(gi.getUsername(), gi.getContact(), text,gi.getContactServer(), new ChatAPI.responseCallbacks() {
                            @Override
                            public void onSuccess() {
                                // TODO: right now, trasnfer works only in our server.
                                // now we sent two request, send message in our server and transfer.
                                Log.d("MassageActivity","message sent to server: " + text);
                                // remove old messages
                                messageDao.nuke();
                                // should add our own message, because of some data that server adds, we will load all message with contact.
                                chatAPI.getAllMessagesWithContact(gi.getContact(), callbacks);
                                msgedittext.setText("");
                            }

                            @Override
                            public void onFailure() {
                                Log.d("MassageActivity","failed to transfer.");
                            }
                        });
                    }

                    @Override
                    public void onFailure() {
                        Log.d("MassageActivity","failed to send message (not transfer).");
                    }
                });

            }
        });
    }
    @Override
    protected void onResume() {
        GlobalInfo gi =(GlobalInfo) getApplicationContext();
        ChatAPI chatAPI = new ChatAPI();

        chatAPI.getAllMessagesWithContact(gi.getContact(), callbacks);
        super.onResume();
    }

}