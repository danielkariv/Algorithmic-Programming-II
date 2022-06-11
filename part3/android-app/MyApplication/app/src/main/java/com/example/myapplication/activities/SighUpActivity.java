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

public class SighUpActivity extends AppCompatActivity {

    private boolean checkInputs(String username, String password, String confirmPassword, String displayName){
        if (username.equals("") || password.equals("") || confirmPassword.equals("") || displayName.equals(""))
            return false;
        else if (password.equals(confirmPassword))
            if(password.matches("^[A-Za-z0-9]*$"))
                return true; // all inputs fields has text and password == confirmPassword and password has letters and digits.
        return false;
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sigh_up);

        GlobalInfo gi =(GlobalInfo) getApplicationContext();
        ChatAPI chatAPI = new ChatAPI();

        Button registerBtn = findViewById(R.id.registredButton);
        registerBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                EditText usernameInput =findViewById(R.id.registerUsername);
                EditText passwordInput =findViewById(R.id.registerPassword);
                EditText confirmPasswordInput =findViewById(R.id.registerConfirmPassword);
                EditText displaynameInput =findViewById(R.id.registredDisplayname);

                String username = usernameInput.getText().toString();
                String password = passwordInput.getText().toString();
                String confirmPassword = confirmPasswordInput.getText().toString();
                String displayName = displaynameInput.getText().toString();

                // checks input for empty inputs and password enter twice right, and for password have letters/digits only.
                boolean isValid =checkInputs(username,password,confirmPassword,displayName);
                if(isValid)
                chatAPI.register(username,displayName ,password, new ChatAPI.responseCallbacks() {
                    @Override
                    public void onSuccess() {
                        // successfully register new user so we move back to login form.
                        finish();
                    }

                    @Override
                    public void onFailure() {
                        // TODO: report failed to login (UI element?).
                    }
                });
                else{
                    // TODO: report invalid inputs (could be wrong password/confirm password, or empty inputs).
                }

            }
        });

        TextView log=findViewById(R.id.returntologin);
        log.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                //rederct to sighup
                Intent intent= new Intent(SighUpActivity.this,LogInActivity.class);
                startActivity(intent);
            }
        });
    }
}