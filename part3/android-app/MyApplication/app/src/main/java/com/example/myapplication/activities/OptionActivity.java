package com.example.myapplication.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.myapplication.GlobalInfo;
import com.example.myapplication.R;

public class OptionActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_option);

        GlobalInfo gi =(GlobalInfo) getApplicationContext();
        EditText apiserver= (EditText) findViewById(R.id.apiserveredit);
        EditText hubserver= (EditText) findViewById(R.id.hubserveredit);
        TextView optionerror= findViewById(R.id.optionerror);
        Button submit =(Button)findViewById(R.id.optionsubmit);
        submit.setOnClickListener(new View.OnClickListener() {
                          @Override
                    public void onClick(View view) {


                              String apiserverst= apiserver.getText().toString();
                              String hubserverst= hubserver.getText().toString();
                              if (apiserverst.equals(""))
                              {
                                  optionerror.setText("Api server is empty");
                              }
                              if (hubserverst.equals(""))
                              {
                                  optionerror.setText("Hub server is empty");
                              }

                              if (apiserverst.equals("") && hubserverst.equals(""))
                              {
                                  optionerror.setText("Api server and Hub server is empty");
                              }
                            if ( !apiserverst.equals("") && !hubserverst.equals(""))
                            {
                                optionerror.setText("");
                                gi.setApiServer(apiserverst);
                                gi.setHubServer(hubserverst);
                                Intent intent= new Intent(OptionActivity.this,LogInActivity.class);
                                startActivity(intent);
                            }

                   }
                 }



        );
        Button back =(Button)findViewById(R.id.back);
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent= new Intent(OptionActivity.this,LogInActivity.class);
                startActivity(intent);
            }
        });

    }
}