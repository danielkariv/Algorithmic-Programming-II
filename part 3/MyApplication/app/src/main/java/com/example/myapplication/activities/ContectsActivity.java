package com.example.myapplication.activities;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.room.Room;

import com.example.myapplication.AppDB;
import com.example.myapplication.Contact;
import com.example.myapplication.ContactDao;
import com.example.myapplication.ContactsViewModel;
import com.example.myapplication.GlobalInfo;
import com.example.myapplication.R;
import com.example.myapplication.adapters.ContactsListAdapter;
import com.example.myapplication.api.ChatAPI;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import android.content.BroadcastReceiver;
import android.content.IntentFilter;
public class ContectsActivity extends AppCompatActivity {

    private AppDB db;

    private ContactDao contactDao;

    private ContactsViewModel viewModel;
    public static final String NOTIFY_ACTIVITY_ACTION="notify_activity";
    private BroadcastReceiver brodcastReciver;

    @Override
    protected  void onStart(){
        super.onStart();
        brodcastReciver = new BroadcastReceiver()
        {
            @Override
            public void onReceive(Context context, Intent intent) {


                if (intent.getAction().equals(NOTIFY_ACTIVITY_ACTION))
                {
                    finish();
                    startActivity(getIntent());
                }
            }


        };
        IntentFilter filter= new IntentFilter(NOTIFY_ACTIVITY_ACTION);
        registerReceiver(brodcastReciver,filter);
    }

    @Override
    protected void onStop()
    {
        super.onStop();
        unregisterReceiver(brodcastReciver);
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contects);
        // variables we need to talk to local database and external.
        GlobalInfo gi =(GlobalInfo) getApplicationContext();
        db = Room.databaseBuilder(getApplicationContext(), AppDB.class, "AppDB")
                .allowMainThreadQueries()
                .build();
        contactDao = db.contactDao();

        viewModel = new ViewModelProvider(this).get(ContactsViewModel.class);
        // connect logic to recyclerview -> renders contacts we have locally (and update it by itself).
        RecyclerView contactRecyclerView = (RecyclerView)findViewById(R.id.contactlist);
        final ContactsListAdapter adapter = new ContactsListAdapter(this, new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent= new Intent(ContectsActivity.this,MassageActivity.class);
                startActivity(intent);
            }
        });
        contactRecyclerView.setAdapter(adapter);
        contactRecyclerView.setLayoutManager(new LinearLayoutManager(this));

        viewModel.getContacts().observe(this, new Observer<List<Contact>>() {
            @RequiresApi(api = Build.VERSION_CODES.N)
            @Override
            public void onChanged(List<Contact> contacts) {
                // reprint contacts in list.
                // TODO: sort list by lastdate.
                contacts.sort(new Comparator<Contact>() {
                    @RequiresApi(api = Build.VERSION_CODES.O)
                    @Override
                    public int compare(Contact contact, Contact t1) {
                        if (contact.lastdate == null || contact.lastdate == ""){
                            return -1;
                        }
                        else if (t1.lastdate == null || t1.lastdate == ""){
                            return 1;
                        }
                        LocalDateTime contactDate = LocalDateTime.parse(contact.lastdate);
                        LocalDateTime t1Date = LocalDateTime.parse(t1.lastdate);
                        boolean after = contactDate.isAfter(t1Date);
                        return (after)? -1:1;
                    }
                });
                adapter.setContacts(contacts);
            }
        });
        // load data from local database to 'contactlist'
        viewModel.getContacts().setValue(contactDao.index());

        // after loading what we got locally, we get new information from server async.
        // need to save it locally and than run again on the data to reprint it to screen.
        ChatAPI chatAPI = new ChatAPI();

        chatAPI.getAllContacts(new ChatAPI.responseContactsCallbacks() {
            @Override
            public void onSuccess(List<Contact> contacts) {
                Log.d("ContactsActivity","Success when get all contacts");
                // remove all contacts
                contactDao.nuke();
                // add new contacts to local database.
                for (Contact c:contacts) {
                    // TODO: doesn't insert contacts right. The issue is with the key (Id) that Dao creates but we don't receive it from server.
                    //  So saving new contacts or updating existing ones it complicated.
                    //  Ideally, we want to add contacts in relation to current user login.
                    //  Notice: Databases doesn't get clean when switching users or reopening the app. You need to remove app to reset it for now.

                    contactDao.insert(c);
                }
                // load data from local database to 'contactlist'
                viewModel.getContacts().setValue(contactDao.index());
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

    @Override
    protected void onResume() {
        ChatAPI chatAPI = new ChatAPI();

        chatAPI.getAllContacts(new ChatAPI.responseContactsCallbacks() {
            @Override
            public void onSuccess(List<Contact> contacts) {
                Log.d("ContactsActivity","Success when get all contacts");
                // remove old contacts
                contactDao.nuke();
                // add new contacts to local database.
                for (Contact c:contacts) {
                    contactDao.insert(c);
                }
                // load data from local database to 'contactlist'
                viewModel.getContacts().setValue(contactDao.index());
            }

            @Override
            public void onFailure() {
                // TODO: report to user when failed to load contacts (UI element?)?

                Log.d("ContactsActivity","Failure when get all contacts");
            }
        });
        super.onResume();
    }
}