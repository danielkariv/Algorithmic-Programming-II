package com.example.myapplication;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import java.util.List;

@Dao
public interface MessageDao {
    // TODO: add getting all message for given contact and given user (may need some reimplemetion with how it saves in Database).
    @Query("SELECT * FROM message")
    List<Message> index();

    @Query("SELECT * FROM message WHERE id = :id")
    Message get(int id);

    @Insert
    void insert(Message... messages);

    @Update
    void update(Message... messages);

    @Delete
    void delete(Message... messages);
}
