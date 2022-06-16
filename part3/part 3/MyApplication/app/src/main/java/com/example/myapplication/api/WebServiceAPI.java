package com.example.myapplication.api;

import com.example.myapplication.Contact;
import com.example.myapplication.Message;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface WebServiceAPI {
    class LoginRq{
        public String Id;
        public String Password;
    }
    @POST("Users/Login")
    Call<Void> login(@Body LoginRq loginRq);
    class RegisterRq{
        public String Id;
        public String Name;
        public String Password;
    }
    @POST("Users/Register")
    Call<Void> register(@Body RegisterRq registerRq);

    @GET("api/contacts")
    Call<List<Contact>> ContactsGET();

    class AddContactRq {
        public String Id;
        public String Name;
        public String Server;
    }
    @POST("api/contacts")
    Call<Void> ContactsPOST(@Body AddContactRq contactRq);

    // TODO: doesn't returning details on user yet.
    //   Not sure if we need it (could be used for getting contacts details but we already save it when we get all of them).
    @GET("api/contacts/{id}")
    Call<Void> ContactsIDGET(@Path("id") String id);

    @GET("api/contacts/{id}/messages")
    Call<List<Message>> ContactsIDMessagesGET(@Path("id") String id);
    class AddMessageRq
    {
        public String Content;
    }
    @POST("api/contacts/{id}/messages")
    Call<Void> ContactsIDMessagesPOST(@Path("id") String id,@Body AddMessageRq messageRq);

    class Invitation
    {
        public String From;
        public String To;
        public String Server;
    }
    @POST("api/invitations")
    Call<Void> InvitationsPOST(@Body Invitation invitation);

    class Transfer
    {
        public String From;
        public String To;
        public String Content;
    }
    @POST("api/transfer")
    Call<Void> TransferPOST(@Body Transfer transfer);
/*
    // EXAMPLE FOR DIFFERENT TYPES OF FUNCTIONS.
    @GET("posts")
    Call<List<Post>> getPosts();

    @POST("posts")
    Call<Void> createPost(@Body Post post);

    @DELETE("posts/{id}")
    Call<Void> deletePost(@Path("id") int id);

 */

}
