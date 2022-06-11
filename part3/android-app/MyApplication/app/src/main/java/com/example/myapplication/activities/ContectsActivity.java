package com.example.myapplication.activities;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import com.example.myapplication.AppDB;
import com.example.myapplication.Contact;
import com.example.myapplication.ContactDao;
import com.example.myapplication.GlobalInfo;
import com.example.myapplication.R;
import com.example.myapplication.api.ChatAPI;

import java.util.List;

public class ContectsActivity extends AppCompatActivity {

    private AppDB db;

    private ContactDao contactDao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contects);

        GlobalInfo gi =(GlobalInfo) getApplicationContext();

        db = Room.databaseBuilder(getApplicationContext(), AppDB.class, "AppDB")
                .allowMainThreadQueries()
                .build();
        contactDao = db.contactDao();

        ChatAPI chatAPI = new ChatAPI();

        chatAPI.getAllContacts(new ChatAPI.responseContactsCallbacks() {
            @Override
            public void onSuccess(List<Contact> contacts) {
                // TODO: use the given data to save locally (not working yet) and to display it to user in UI (didn't implement yet).
                Log.d("ContactsActivity","Success when get all contacts");
                for (Contact c:contacts) {
                    // TODO: doesn't insert contacts right. The issue is with the key (Id) that Dao creates but we don't receive it from server.
                    //  So saving new contacts or updating existing ones it complicated.
                    //  Ideally, we want to add contacts in relation to current user login.
                    //  Notice: Databases doesn't get clean when switching users or reopening the app. You need to remove app to reset it for now.

                    contactDao.insert(c);
                }

            }

            @Override
            public void onFailure() {
                // TODO: report to user when failed to load contacts (UI element?)?

                Log.d("ContactsActivity","Failure when get all contacts");
            }
        });



        // add new contect on click event, tries to add new contact via API.
        Button addcontectbnt= (Button) findViewById(R.id.addcontect);
        addcontectbnt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent= new Intent(ContectsActivity.this,AddContectActivity.class);
                startActivity(intent);
            }
        });
        // TODO: if you want to use DisplayName instead of username here, we will have to do another call to server
        //  using "Users/Details" url with given username input which returns displayName. (Didn't made implementation for that yet in Android side).
        //  Notice: probably should implement in LogInAcitivty the call for details, and then add them to GlobalInfo.
        TextView loggedUsrenametext = (TextView)findViewById(R.id.LoggedUsername);
        loggedUsrenametext.setText(gi.getUsername());
    }
}