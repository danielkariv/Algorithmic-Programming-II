package com.example.myapplication.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.example.myapplication.GlobalInfo;
import com.example.myapplication.R;

public class SighUpActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sigh_up);

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