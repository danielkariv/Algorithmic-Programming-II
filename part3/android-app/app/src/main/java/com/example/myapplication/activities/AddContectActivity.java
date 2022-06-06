package com.example.myapplication.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.myapplication.R;

public class AddContectActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_contect);
        EditText contactusername= (EditText) findViewById(R.id.contectusernameedit);
        EditText contactserver= (EditText) findViewById(R.id.contectserveredit);
        EditText contactnick= (EditText) findViewById(R.id.contectnickedit);
        TextView addcontacterror= findViewById(R.id.addcontecterrorerror);
        Button submit =(Button)findViewById(R.id.addcontectsubmit);
        submit.setOnClickListener(new View.OnClickListener() {
                                      @Override
                                      public void onClick(View view) {


                                          String contactusernamest= contactusername.getText().toString();
                                          String contactserverst= contactserver.getText().toString();
                                          String contactnickst=contactnick.getText().toString();
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

                                              Intent intent= new Intent(AddContectActivity.this,ContectsActivity.class);
                                              startActivity(intent);
                                          }

                                      }
                                  }



        );
        Button back =(Button)findViewById(R.id.backtocontects);
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent= new Intent(AddContectActivity.this,ContectsActivity.class);
                startActivity(intent);
            }
        });
    }
}