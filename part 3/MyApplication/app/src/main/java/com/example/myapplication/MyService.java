package com.example.myapplication;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.example.myapplication.activities.ContectsActivity;
import com.example.myapplication.activities.MassageActivity;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class MyService extends FirebaseMessagingService {
    public MyService() {
    }

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
       if (remoteMessage.getNotification() !=null)
       {
           createNotificationChannel();

           NotificationCompat.Builder builder = new NotificationCompat.Builder(this,"1")
                   .setSmallIcon(R.drawable.ic_launcher_foreground)
                   .setContentTitle(remoteMessage.getNotification().getTitle())
                   .setContentText(remoteMessage.getNotification().getBody())
                   .setPriority(NotificationCompat.PRIORITY_DEFAULT);



           NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);
           notificationManager.notify(1,builder.build());
           try
           {
               Intent brodcastIntent = new Intent();
               brodcastIntent.setAction(MassageActivity.NOTIFY_ACTIVITY_ACTION);

               sendBroadcast(brodcastIntent);
               Intent brodcastIntent2 = new Intent();
               brodcastIntent2.setAction(ContectsActivity.NOTIFY_ACTIVITY_ACTION);
               sendBroadcast(brodcastIntent2);
           }
           catch (Exception e)
           {
               int hjjkreg=0;
           }
       }
    }
    private  void createNotificationChannel()
    {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
        {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel("1","my channel", importance);
            channel.setDescription("Demo channel");
            NotificationManager notificationManager= getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }
}