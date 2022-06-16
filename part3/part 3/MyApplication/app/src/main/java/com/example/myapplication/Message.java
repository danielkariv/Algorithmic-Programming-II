package com.example.myapplication;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class Message {
    @PrimaryKey(autoGenerate=true)
    private int index;
    private String user;
    private String contactId;
    private String content;
    private String created; // TODO: It is TimeDate object convert to something in JSON, convert back to String?
                            //   not sure if it working, need to test.
    private boolean sent;

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

    public String getContactId() {
        return contactId;
    }

    public void setContactId(String contactId) {
        this.contactId = contactId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public boolean isSent() {
        return sent;
    }

    public void setSent(boolean sent) {
        this.sent = sent;
    }

    public Message(String user, String contactId, String content, String created, boolean sent) {
        this.user = user;
        this.contactId = contactId;
        this.content = content;
        this.created = created;
        this.sent = sent;
    }
}
