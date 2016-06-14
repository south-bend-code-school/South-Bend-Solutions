(function(){
  $(document).ready(initialize);
  function initialize(){
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDm2ZN6m-cjZI8F922JKg9kPx0LRj0EgFc",
      authDomain: "sbcs-south-bend-solutions.firebaseapp.com",
      databaseURL: "https://sbcs-south-bend-solutions.firebaseio.com/",
      storageBucket: "sbcs-south-bend-solutions.appspot.com",
    };
    firebase.initializeApp(config);

    // Firebase storage
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var imagesRef = storageRef.child('images');

    $( "#submit" ).click(function() {

      // Picture
      var selectedFile = document.getElementById('profilePhotoFileUpload').files[0];
      // Firebase Paths
      var path = "images/" + $('#name').val() + "_" + $('#agerange').val(); + "_" + selectedFile.name;
      var pathRef = storageRef.child(path);

      // Upload
      var uploadTask = pathRef.put(selectedFile);
      uploadTask.on('state_changed', function(snapshot){
      }, function(error) {
          console.log("Error uploading file");
      }, function() {
          var downloadURL = uploadTask.snapshot.downloadURL;
          var name = $('#name').val();
          var age = $('#agerange').val();
          var story = $('#comments').val();

          writeNewPost(name, age, story, downloadURL);
          // window.location.replace('./FCRB.html');

      });


    });

    function writeNewPost(name, age, story, picPath) {
                // console.log('writing new post');
      // A post entry.
      var postData = {
        name: name,
        age: age,
        story: story,
        picPath: picPath
      };
          // console.log('Post now written');
      // Get a key for a new Post.
      var newPostKey = firebase.database().ref().child('posts').push().key;
      //alert(newPostKey);
          // console.log('new key defined:');
          // console.log(newPostKey);
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
          // console.log('updates:');
          // console.log(updates);

      //alert(updates);
      updates['/posts/' + newPostKey] = postData;
      //alert(updates);
          // console.log('Printing postData:');
          // console.log(postData);
      var onComplete = function(error) {
            console.log('I am in the on complete function now');
        if (error) {
          console.log('Synchronization failed');
        } else {
          console.log('Synchronization succeeded');
           window.location.replace('./FCRB.html');
        }
      };
           return firebase.database().ref().update(updates, onComplete);

      //return firebase.database().ref().update(updates);

    }
    // [END write_fan_out]


  }

})();
