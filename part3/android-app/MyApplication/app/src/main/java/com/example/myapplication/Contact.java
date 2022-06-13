package com.example.myapplication;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class Contact {

    @PrimaryKey(autoGenerate = true)
    public int index;

    public String user;
    // Username (of contact)
    public String id;
    // DisplayName (of contact)
    public String name;

    public String server;

    public String last;

    public String lastdate;


    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server;
    }

    public String getLast() {
        return last;
    }

    public void setLast(String last) {
        this.last = last;
    }

    public String getLastDate() {return lastdate; }

    public void setLastDate(String lastDate) {this.lastdate = lastDate; }

    public Contact(String user, String id, String name, String server) {
        this.user = user;
        this.id = id;
        this.name = name;
        this.server = server;
        this.last = "";
        this.lastdate = "";
    }
}
