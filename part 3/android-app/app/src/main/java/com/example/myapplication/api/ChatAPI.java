package com.example.myapplication.api;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

import com.example.myapplication.Contact;
import com.example.myapplication.GlobalInfo;
import com.example.myapplication.Message;

import java.io.IOException;
import java.net.CookieManager;
import java.util.HashSet;
import java.util.List;

import okhttp3.Interceptor;
import okhttp3.JavaNetCookieJar;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ChatAPI {
    Retrofit retrofit;
    WebServiceAPI webServiceAPI;

    public ChatAPI(){
        GlobalInfo gi =(GlobalInfo)GlobalInfo.context;
        OkHttpClient okHttpClient = new OkHttpClient.Builder()
                .cookieJar(new JavaNetCookieJar(new CookieManager()))
                .addInterceptor(new Interceptor() {
                    @Override
                    public okhttp3.Response intercept(Chain chain) throws IOException {
                        return null;
                    }
                })
                .build();

        retrofit = new Retrofit.Builder()
                .baseUrl(gi.getApiServer())
                .addConverterFactory(GsonConverterFactory.create())
                .client(new OkHttpClient.Builder()
                        // ReceivedCookiesInterceptor
                        .addInterceptor(new Interceptor() {
                            private Context context = gi.getApplicationContext();

                            @Override
                            public okhttp3.Response intercept(Chain chain) throws IOException {
                                okhttp3.Response originalResponse = chain.proceed(chain.request());

                                if (!originalResponse.headers("Set-Cookie").isEmpty()) {
                                    SharedPreferences test = PreferenceManager.getDefaultSharedPreferences(context);
                                    HashSet<String> cookies = (HashSet<String>) PreferenceManager.getDefaultSharedPreferences(context).getStringSet("PREF_COOKIES", new HashSet<String>());

                                    for (String header : originalResponse.headers("Set-Cookie")) {
                                        cookies.clear();
                                        cookies.add(header);
                                    }

                                    SharedPreferences.Editor memes = PreferenceManager.getDefaultSharedPreferences(context).edit();
                                    memes.putStringSet("PREF_COOKIES", cookies).apply();
                                    memes.commit();
                                }

                                return originalResponse;
                            }
                        })
                        // AddCookiesInterceptor
                        .addInterceptor(new Interceptor() {

                            public static final String PREF_COOKIES = "PREF_COOKIES";
                            private Context context = gi.getApplicationContext();;

                            @Override
                            public okhttp3.Response intercept(Chain chain) throws IOException {
                                Request.Builder builder = chain.request().newBuilder();

                                HashSet<String> preferences = (HashSet<String>) PreferenceManager.getDefaultSharedPreferences(context).getStringSet(PREF_COOKIES, new HashSet<String>());
                                //okhttp3.Request original = chain.request();
                                //if(original.url().toString().contains("distributor")){
                                    for (String cookie : preferences) {
                                        builder.addHeader("Cookie", cookie);
                                    }
                                //}
                                return chain.proceed(builder.build());
                            }
                        })
                        .build())
                .build();

        webServiceAPI = retrofit.create(WebServiceAPI.class);
    }
    public interface responseCallbacks {
        void onSuccess();
        void onFailure();
    }
    public interface responseContactsCallbacks {
        void onSuccess(List<Contact> contacts);
        void onFailure();
    }
    public interface responseMessagesCallbacks {
        void onSuccess(List<Message> messages);
        void onFailure();
    }
    public void login(String id, String password, final responseCallbacks callbacks){
        WebServiceAPI.LoginRq loginRq = new WebServiceAPI.LoginRq();
        loginRq.Id = id;
        loginRq.Password = password;
        Call<Void> call = webServiceAPI.login(loginRq);


        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if(response.isSuccessful()){
                    // success to login.
                    callbacks.onSuccess();

                }else{
                    // failed to login (bad request).
                    callbacks.onFailure();
                }

            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                callbacks.onFailure();
            }
        });
    }

    public void register(String id, String name, String password, final responseCallbacks callbacks){
        WebServiceAPI.RegisterRq registerRq = new WebServiceAPI.RegisterRq();
        registerRq.Id = id;
        registerRq.Name = name;
        registerRq.Password = password;
        Call<Void> call = webServiceAPI.register(registerRq);

        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if(response.isSuccessful()){
                    // success to login.
                    callbacks.onSuccess();

                }else{
                    // failed to login (bad request).
                    callbacks.onFailure();
                }

            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                callbacks.onFailure();
            }
        });
    }

    public void getAllContacts(final responseContactsCallbacks callbacks){
        Call<List<Contact>> call = webServiceAPI.ContactsGET();
        call.enqueue(new Callback<List<Contact>>() {
            @Override
            public void onResponse(Call<List<Contact>> call, Response<List<Contact>> response) {
                if(response.isSuccessful()){
                    // got contacts belong to connected user.
                    callbacks.onSuccess(response.body());

                }else{
                    // failed to login (bad request).
                    callbacks.onFailure();
                }
            }

            @Override
            public void onFailure(Call<List<Contact>> call, Throwable t) {
                callbacks.onFailure();
            }
        });
    }

    public void addContact(String id, String server, String displayName,final responseCallbacks callbacks){
        WebServiceAPI.AddContactRq contactRq = new WebServiceAPI.AddContactRq();
        contactRq.Id = id;
        contactRq.Server = server;
        contactRq.Name = displayName;
        Call<Void> call = webServiceAPI.ContactsPOST(contactRq);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if(response.isSuccessful()){
                    // we added new contact.
                    callbacks.onSuccess();

                }else{
                    // failed to login (bad request).
                    callbacks.onFailure();
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {callbacks.onFailure();}
        });
    }

    public void getContactInfo(String id,final responseCallbacks callbacks){
        Call<Void> call = webServiceAPI.ContactsIDGET(id);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if(response.isSuccessful()){
                    // got contact info.
                    // TODO: It isn't used but maybe we would want to receive it response.body (has contact details)?
                    callbacks.onSuccess();

                }else{
                    // failed to login (bad request).
                    callbacks.onFailure();
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {callbacks.onFailure();}
        });
    }

    public void getAllMessagesWithContact(String id,final responseMessagesCallbacks callbacks){
        Call<List<Message>> call = webServiceAPI.ContactsIDMessagesGET(id);
        call.enqueue(new Callback<List<Message>>() {
             @Override
             public void onResponse(Call<List<Message>> call, Response<List<Message>> response) {
                 if (response.isSuccessful()) {
                     // got all messages belong to connected user and contact we look at (id).
                     callbacks.onSuccess(response.body());

                 } else {
                     // failed to login (bad request).
                     callbacks.onFailure();
                 }
             }

             @Override
             public void onFailure(Call<List<Message>> call, Throwable t) {
                 callbacks.onFailure();
             }
        });
    }

    public void addMessageWithContact(String id, String content ,final responseCallbacks callbacks){
        WebServiceAPI.AddMessageRq messageRq = new WebServiceAPI.AddMessageRq();
        messageRq.Content = content;
        Call<Void> call = webServiceAPI.ContactsIDMessagesPOST(id,messageRq);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if(response.isSuccessful()){
                    // we add new message between us to contact.
                    callbacks.onSuccess();

                }else{
                    // failed to login (bad request).
                    callbacks.onFailure();
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {callbacks.onFailure();}
        });
    }

    // TODO: sendInvitation and transfer aren't fully working yet, it only support our server, we need to create this ChatAPI with other server URL.

    public void sendInvitation(String from, String to, String server,final responseCallbacks callbacks){
        WebServiceAPI.Invitation invitation = new WebServiceAPI.Invitation();
        invitation.From= from;
        invitation.To= to;
        invitation.Server= server;
        Call<Void> call = webServiceAPI.InvitationsPOST(invitation);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if(response.isSuccessful()){
                    // we sent invitation to user we wanted to add.
                    callbacks.onSuccess();

                }else{
                    // failed to send invitation (server offline, ...)
                    callbacks.onFailure();
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {callbacks.onFailure();}
        });
    }

    public void trasnfer (String from, String to, String content,final responseCallbacks callbacks){
        WebServiceAPI.Transfer transfer = new WebServiceAPI.Transfer();
        transfer.From = from;
        transfer.To = to;
        transfer.Content = content;
        Call<Void> call = webServiceAPI.TransferPOST(transfer);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if(response.isSuccessful()){
                    // we sent message to user we talk with (external server or ours).
                    callbacks.onSuccess();

                }else{
                    // failed to send invitation (server offline, ...)
                    callbacks.onFailure();
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {callbacks.onFailure();}
        });
    }
}
