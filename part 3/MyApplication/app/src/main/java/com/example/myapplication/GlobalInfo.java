package com.example.myapplication;

import android.app.Application;
import android.content.Context;

public class GlobalInfo extends Application {
    public static Context context;
    private String ApiServer = "http://10.0.2.2:5123/";
    private String HubServer="http://10.0.2.2:7048/";

    private String Username = "TEST_USER";
    private String Contact = "TEST_CONTACT";
    private String displayName;
    private String contactServer;
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

    public void setDisplayName(String displayName) {this.displayName = displayName;}
    public String getDisplayName() {return displayName;}

    public String getContactServer() {
        return contactServer;
    }
    public void setContactServer(String contactServer) {
        this.contactServer = contactServer;
    }
}
