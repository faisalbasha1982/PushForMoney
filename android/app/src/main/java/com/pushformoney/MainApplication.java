package com.pushformoney;

import android.app.Application;

import com.facebook.react.ReactApplication;
import net.jodybrewster.linkedinlogin.RNLinkedinLoginPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.goldenowl.twittersignin.TwitterSigninPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import ca.bigdata.voice.contacts.BDVSimpleContactsPackage;
import cn.touna.reactnativersautil.ReactNativeRSAUtilPackage;
import com.RNRSA.RNRSAPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.beefe.picker.PickerViewPackage;
import com.chirag.RNMail.RNMail;
import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;
import com.github.xfumihiro.react_native_image_to_base64.ImageToBase64Package;
import com.imagepicker.ImagePickerPackage;
import fr.snapp.imagebase64.RNImgToBase64Package;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lynxit.contactswrapper.ContactsWrapperPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNLinkedinLoginPackage(),
            new RNFetchBlobPackage(),
            new VectorIconsPackage(),
            new TwitterSigninPackage(),
            new SplashScreenReactPackage(),
            new BDVSimpleContactsPackage(),
            new ReactNativeRSAUtilPackage(),
            new RNRSAPackage(),
            new ReactNativePushNotificationPackage(),
            new PickerViewPackage(),
            new RNMail(),
            new RNImmediatePhoneCallPackage(),
            new ImageToBase64Package(),
            new ImagePickerPackage(),
            new RNImgToBase64Package(),
            new RNGoogleSigninPackage(),
            new RNFetchBlobPackage(),
            new FBSDKPackage(),
            new RNDeviceInfo(),
            new ContactsWrapperPackage(),
            new ReactNativeContacts(),
            new ReactNativeConfigPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
