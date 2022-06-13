package com.example.myapplication;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import java.util.List;

public class ContactsViewModel extends ViewModel {

    private MutableLiveData<List<Contact>> contacts;

    public MutableLiveData<List<Contact>> getContacts(){
        if(contacts == null){
            contacts = new MutableLiveData<List<Contact>>();
        }
        return contacts;
    }

}
