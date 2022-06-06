package com.example.myapplication.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.example.myapplication.GlobalInfo;
import com.example.myapplication.R;

public class LogInActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_log_in);
        GlobalInfo gi =(GlobalInfo) getApplicationContext();
        TextView nr= findViewById(R.id.register);
        TextView si= findViewById(R.id.serversinfo);
        String s= "Api server: "+ gi.getApiServer() +" Hub server: "+ gi.getHubServer();
        si.setText(s);
        //option button click
        Button optionbt= (Button)  findViewById(R.id.optionButton);
        optionbt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                  Intent intent2= new Intent(LogInActivity.this,OptionActivity.class);
                startActivity(intent2);
            }
        });
        //login on click
        Button loginbnt=(Button) findViewById(R.id.loginButton);
        loginbnt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent= new Intent(LogInActivity.this,ContectsActivity.class);
                startActivity(intent);
            }
        });
        nr.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                //rederct to sighup
                Intent intent= new Intent(LogInActivity.this,SighUpActivity.class);
                startActivity(intent);
            }
        });
    }
}