package com.example.myapplication.activities;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
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

public class AddContectActivity extends AppCompatActivity {

    private AppDB db;

    private ContactDao contactDao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_contect);

        db = Room.databaseBuilder(getApplicationContext(), AppDB.class, "AppDB")
                .allowMainThreadQueries()
                .fallbackToDestructiveMigration()
                .build();
        contactDao = db.contactDao();

        EditText contactusername= (EditText) findViewById(R.id.contectusernameedit);
        EditText contactserver= (EditText) findViewById(R.id.contectserveredit);
        EditText contactnick= (EditText) findViewById(R.id.contectnickedit);
        TextView addcontacterror= findViewById(R.id.addcontecterrorerror);
        Button submit =(Button)findViewById(R.id.addcontectsubmit);
        submit.setOnClickListener(new View.OnClickListener() {
              @Override
              public void onClick(View view) {
                  // get texts from form input.
                  String contactusernamest= contactusername.getText().toString();
                  String contactserverst= contactserver.getText().toString();
                  String contactnickst=contactnick.getText().toString();
                  // check and report if some inputs aren't given.
                  if (contactusernamest.equals(""))
                  {
                      addcontacterror.setText("username is empty");
                  }
                  if (contactserverst.equals(""))
                  {
                      addcontacterror.setText(" server is empty");
                  }
                  if (contactnickst.equals(""))
                  {
                      addcontacterror.setText("nickname is empty");
                  }

                  if (contactusernamest.equals("") && contactserverst.equals(""))
                  {
                      addcontacterror.setText("username and server are  empty");
                  }
                  if (contactusernamest.equals("") && contactnickst.equals(""))
                  {
                      addcontacterror.setText("username and nickname are  empty");
                  }
                  if (contactnickst.equals("") && contactserverst.equals(""))
                  {
                      addcontacterror.setText("nickname and server are  empty");
                  }

                  if (contactnickst.equals("") && contactserverst.equals("") && contactusernamest.equals(""))
                  {
                      addcontacterror.setText(" username,nickname and server are  empty");
                  }

                  if ( !contactnickst.equals("") && !contactserverst.equals("") && !contactusernamest.equals(""))
                  {
                      addcontacterror.setText("");
                      ChatAPI chatAPI = new ChatAPI();

                      chatAPI.addContact(contactusernamest,contactserverst,contactnickst,new ChatAPI.responseCallbacks() {
                          @Override
                          public void onSuccess() {
                              // TODO: adding new contact or contacts in general to local DB isn't working well yet. Need to implement it better so each logged user has it own table for contacts/messages.
                              GlobalInfo gi =(GlobalInfo) getApplicationContext();
                              chatAPI.sendInvitation(gi.getUsername(), contactusernamest, contactserverst, new ChatAPI.responseCallbacks() {
                                  @Override
                                  public void onSuccess() {
                                      // success in sending invitation over to contact's server.
                                  }

                                  @Override
                                  public void onFailure() {
                                      addcontacterror.setText("failed to send invitation.");
                                  }
                              });
                              Contact contact = new Contact(gi.getUsername(),contactusernamest,contactnickst,contactserverst);
                              contactDao.insert(contact);
                              List<Contact> c = contactDao.index();
                              finish();
                          }

                          @Override
                          public void onFailure() {
                              addcontacterror.setText("failed to add new contact.");
                          }
                      });


                  }

              }
          }
        );
        // back button on click event, returns back when clicked.
        Button back =(Button)findViewById(R.id.backtocontects);
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });
    }
}