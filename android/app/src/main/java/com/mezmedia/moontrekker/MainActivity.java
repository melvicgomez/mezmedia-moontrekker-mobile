package com.mezmedia.moontrekker;

import com.facebook.FacebookSdk;
import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.content.res.Configuration;
import android.app.PendingIntent;
import android.view.WindowManager;
import android.os.Bundle;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MoonTrekker";
  }

  @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
         intent.putExtra("newConfig", newConfig);
        // sendBroadcast(intent);
        PendingIntent pendingIntent = PendingIntent.getActivity(
                this,
                1,
                intent,
                PendingIntent.FLAG_CANCEL_CURRENT
        );
        try {
            pendingIntent.send();
        } catch (PendingIntent.CanceledException e) {
            e.printStackTrace();
        }

    }
}
