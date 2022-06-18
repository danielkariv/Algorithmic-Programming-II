package com.example.myapplication.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.myapplication.GlobalInfo;
import com.example.myapplication.R;
import com.example.myapplication.api.ChatAPI;
import com.google.firebase.iid.FirebaseInstanceId;

import java.util.concurrent.atomic.AtomicReference;

public class LogInActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_log_in);

        AtomicReference<String> firebaseToken = new AtomicReference<>();
        FirebaseInstanceId.getInstance().getInstanceId().addOnSuccessListener(LogInActivity.this,instanceIdResult ->{
            firebaseToken.set(instanceIdResult.getToken());

        } );
        GlobalInfo gi =(GlobalInfo) getApplicationContext();

        // update current server info.
        TextView si= findViewById(R.id.serversinfo);
        String s= "Api server: "+ gi.getApiServer() ;
           si.setText(s);
        ChatAPI chatAPI = new ChatAPI();

        TextView le= findViewById(R.id.loginerror);
        //option button on click event, moves to optionactivity.
        Button optionbt= (Button)  findViewById(R.id.optionButton);
        optionbt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                  Intent intent2= new Intent(LogInActivity.this,OptionActivity.class);
                startActivity(intent2);
            }
        });
        //login button on click, send request to login with given inputs.
        Button loginbnt=(Button) findViewById(R.id.loginButton);
        loginbnt.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                EditText usernameInput= (EditText)  findViewById(R.id.loginUsername);
                EditText passwordInput = (EditText)  findViewById(R.id.loginPassword);
                String username = usernameInput.getText().toString();
                String password = passwordInput.getText().toString();


                if(firebaseToken.get() == null){
                    le.setText("Error when try to connect to firebase.");
                }
                chatAPI.login(username, password,firebaseToken.get(), new ChatAPI.responseCallbacks() {
                    @Override
                    public void onSuccess() {
                        // successfully login, now get details on user (for DisplayName).
                        gi.setUsername(username);
                        le.setText("");
                        Intent intent = new Intent(LogInActivity.this, ContectsActivity.class);
                        startActivity(intent);
                    }

                    @Override
                    public void onFailure() {
                        // TODO: report failed to login (UI Element?).
                        le.setText("Invalid Username/Password.");
                    }
                });
            }
        });
        //register text on click event, moves to registerActivity.
        TextView nr= findViewById(R.id.register);
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