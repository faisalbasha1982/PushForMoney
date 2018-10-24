package com.pushformoney;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.goldenowl.twittersignin.TwitterSigninPackage;
import ca.bigdata.voice.contacts.BDVSimpleContactsPackage;
import com.RNRSA.RNRSAPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.beefe.picker.PickerViewPackage;
import com.chirag.RNMail.RNMail;
import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;
import com.imagepicker.ImagePickerPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lynxit.contactswrapper.ContactsWrapperPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.goldenowl.twittersignin.TwitterSigninPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import org.devio.rn.splashscreen.SplashScreenReactPackage;


import java.util.Arrays;
import java.util.List;
import android.content.Context;


public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new TwitterSigninPackage(),
            new SplashScreenReactPackage(),
            new BDVSimpleContactsPackage(),
            new RNRSAPackage(),
            new ReactNativePushNotificationPackage(),
            new PickerViewPackage(),
            new RNMail(),
            new RNImmediatePhoneCallPackage(),
            new ImagePickerPackage(),
            new RNGoogleSigninPackage(),
            new RNFetchBlobPackage(),
            new RNDeviceInfo(),
            new ContactsWrapperPackage(),
            new ReactNativeContacts(),
            new ReactNativeConfigPackage(),
            new ReactNativePushNotificationPackage(),
            new PickerViewPackage(),
            new VectorIconsPackage(),
            new FBSDKPackage(mCallbackManager)
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    SplashScreen.show(this);  // here
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    FacebookSdk.sdkInitialize(getApplicationContext());
    AppEventsLogger.activateApp(this);
  }

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }

}
