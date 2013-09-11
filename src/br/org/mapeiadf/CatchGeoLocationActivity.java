package br.org.mapeiadf;

import org.apache.cordova.Config;
import org.apache.cordova.DroidGap;

import android.os.Bundle;
import br.org.mapeiadf.util.SystemUiHider;

/**
 * An example full-screen activity that shows and hides the system UI (i.e.
 * status bar and navigation/system bar) with user interaction.
 * 
 * @see SystemUiHider
 */
public class CatchGeoLocationActivity extends DroidGap {
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		super.setIntegerProperty("splashscreen", R.drawable.splash);
		super.loadUrl(Config.getStartUrl(), 5000);
	}
	
}
