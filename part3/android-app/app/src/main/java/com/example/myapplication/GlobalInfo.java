package com.example.myapplication;

import android.app.Application;

public class GlobalInfo extends Application {
    private String ApiServer;
    private String HubServer;
    public String getApiServer()
    {
        return this.ApiServer;

    }
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
}
