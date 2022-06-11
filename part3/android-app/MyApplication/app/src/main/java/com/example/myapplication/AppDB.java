package com.example.myapplication;

import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(entities = {Message.class, Contact.class}, version = 1)
public abstract class AppDB extends RoomDatabase{
    public abstract  MessageDao messageDao();
    public abstract  ContactDao contactDao();
}
