package com.example.myapplication;

import android.app.Application;
import android.content.Context;

public class GlobalInfo extends Application {
    public static Context context;
    private String ApiServer = "http://10.0.2.2:5123/";
    private String HubServer;
    private String Username = "TEST_USER";
    private String Contact = "TEST_CONTACT";

    @Override
    public void onCreate(){
        super.onCreate();
        context = getApplicationContext();
    }
    public String getApiServer() {return this.ApiServer;}
    public String getHubServer()
    {
        return this.HubServer;
    }
    public void setApiServer(String as)
    {
        this.ApiServer= as;
    }
    public void setHubServer(String hs)
    {
        this.HubServer=hs;
    }
    public String getUsername() {return Username;}
    public void setUsername(String username) {Username = username;}
    public String getContact() {return Contact;}
    public void setContact(String contact) {Contact = contact;}
}
