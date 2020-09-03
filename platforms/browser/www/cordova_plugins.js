cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/src/browser/DeviceProxy.js",
        "id": "cordova-plugin-device.DeviceProxy",
        "pluginId": "cordova-plugin-device",
        "runs": true
    },
    {
        "file": "plugins/com-badrit-contactpicker/www/ContactPicker.js",
        "id": "com-badrit-contactpicker.ContactPicker",
        "pluginId": "com-badrit-contactpicker",
        "clobbers": [
            "navigator.ContactPicker"
        ]
    },
    {
        "file": "plugins/cordova-plugin-contacts-phonenumbers/www/contactsPhoneNumbers.js",
        "id": "cordova-plugin-contacts-phonenumbers.contactsPhoneNumbers",
        "pluginId": "cordova-plugin-contacts-phonenumbers",
        "clobbers": [
            "navigator.contactsPhoneNumbers"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/src/browser/SplashScreenProxy.js",
        "id": "cordova-plugin-splashscreen.SplashScreenProxy",
        "pluginId": "cordova-plugin-splashscreen",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-fcm-with-dependecy-updated/www/FCMPlugin.js",
        "id": "cordova-plugin-fcm-with-dependecy-updated.FCMPlugin",
        "pluginId": "cordova-plugin-fcm-with-dependecy-updated",
        "clobbers": [
            "FCMPlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-device": "2.0.3",
    "com-badrit-contactpicker": "0.3.0",
    "cordova-plugin-contacts-phonenumbers": "0.0.12",
    "cordova-plugin-iosrtc": "6.0.11",
    "cordova-plugin-splashscreen": "5.0.3",
    "cordova-plugin-fcm-with-dependecy-updated": "6.4.0"
}
// BOTTOM OF METADATA
});