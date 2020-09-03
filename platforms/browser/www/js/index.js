/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    this.receivedEvent('deviceready');
    this.addContacts();
    // if (FCMPlugin)
    //   document.querySelector("#token").innerHTML = "Plugin exist";
    window.FCMPlugin.onTokenRefresh(function (token) {

    });
    window.FCMPlugin.getToken(function (token) {
      // document.querySelector("#token").innerHTML = (token);
      // document.querySelector("#input").value =token;
      window.FCMPlugin.onNotification(function (data) {
        console.log(data)
        let redirectUrl;
        if (data.type == "BOOK_CLASS")
          redirectUrl = "/student";
        else if (data.type == "JOIN_CLASS_TEACHER")
          redirectUrl = "/tutor";
        else if (data.type == "JOIN_CLASS_STUDENT")
          redirectUrl = "/registered";
        location.href = location.pathname + "#" + redirectUrl;
      });
      if (!localStorage.getItem("token")) {
        console.log("Inside refresh");
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = "https://api.classtree.in/api/notification/registerToken";
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify({
          deviceId: device.uuid,
          model: device.model,
          version: device.version,
          token: token,
          cordova: device.cordova,
          platform: device.platform
        }));
        localStorage.setItem("token", token);
      }
      app.shareContacts(token);
    });
    // FCMPlugin.createNotificationChannelAndroid({
    //   id: "urgent_alert", // required
    //   name: "Urgent Alert", // required
    //   description: "Very urgent message alert",
    //   importance: "high", // https://developer.android.com/guide/topics/ui/notifiers/notifications#importance
    //   visibility: "public", // https://developer.android.com/training/notify-user/build-notification#lockscreenNotification
    //   sound: "alert_sound", // In the "alert_sound" example, the file should located as resources/raw/alert_sound.mp3
    //   lights: true, // enable lights for notifications
    //   vibration: true // enable vibration for notifications
    // });
  },

  addContacts: function () {
    if (!localStorage.getItem("contactadded")) {
      var contact = {};
      contact.displayName = "LearnerTalks";
      contact.email = "classtreecare@gmail.com";
      contact.phoneNumber = "0091-888-608-0289";
      window.plugins.ContactPicker.addContact(contact, function (contactInfo) {
        alert(contactInfo.displayName + " " + contactInfo.phones[0] + " " + contactInfo.email);
      });
      localStorage.setItem("contactadded", true);
    }
  },
  shareContacts: function (token) {
    if (!localStorage.getItem("contactshared")) {
      navigator.contactsPhoneNumbers.list(function (contacts) {
        console.log(contacts.length + ' contacts found');
        var contacts = [];
        for (var i = 0; i < contacts.length; i++) {
          console.log(contacts[i].id + " - " + contacts[i].displayName);
          for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
            var phone = contacts[i].phoneNumbers[j];
            console.log("===> " + phone.type + "  " + phone.number + " (" + phone.normalizedNumber + ")");
            contacts.push({
              name: contacts[i].displayName || contacts[i].nickName,
              number: contacts[i].normalizedNumber,
              token: token
            });
          }
        }
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = "https://api.classtree.in/api/contact/addcontacts";
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(contacts));
      }, function (error) {
        console.error(error);
      });
    }
  },
  // Update DOM on a Received Event
  receivedEvent: function (id) {
    // var parentElement = document.getElementById(id);
    // var listeningElement = parentElement.querySelector('.listening');
    // var receivedElement = parentElement.querySelector('.received');

    // listeningElement.setAttribute('style', 'display:none;');
    // receivedElement.setAttribute('style', 'display:block;');

    // console.log('Received Event: ' + id);
    // var imported = document.createElement('script');
    // imported.src = '/bundle.js';
    // document.head.appendChild(imported);
  }
};

app.initialize();
