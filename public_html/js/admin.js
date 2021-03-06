$(function () {
    var  APPLICATION_ID = "93083082-4047-A573-FFDA-0A76A3F95400",
         SECRET_KEY = "1401910F-F187-063B-FFAA-17B1D8821B00",
         VERSION = "v1";
         
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION); 
   
   var loginScript = $("#login-template").html();
   var loginTemplate = Handlebars.compile(loginScript);
   
   $('.main-container').html(loginTemplate);
   
   $(document).on('submit', '.form-signin', function(event){
       event.preventDefault();
       
       var data = $(this).serializeArray(),
           email = data[0].value,
           password = data[1].value;
           
      Backendless.UserService.login(email, password, true, new Backendless.Async(userLoggedin, gotError));
   });
   
   $(document).on('click', '.add-blog', function() {
        var addBlogScript = $("#add-blog-template").html();
        var addBlogTemplate = Handlebars.compile(addBlogScript);
   
        $('.main-container').html(addBlogTemplate);
   }) ;
    $(document).on('submit', '.form-add-blog', function (event){
        event.preventDefault();
        
        var data = $(this).serializeArray(),
            title = data[0].value,
            content = data[1].value;
            
        var dataStore = Backendless.Persistence.of(Posts);
        
        var postObject = new Posts({
           title: title,
           content: content,
           authorEmail: Backendless.UserService.getCurrentUser().email
        });
        
        dataStore.save(postObject);
        
        this.title.value = "";
        this.content.value =  "";
    });
});

function Posts(args){
   args = args || {};
   this.title = args.title || "";
   this.content = args.content || "";
   this.authorEmail = args.authorEmail || "";
}

function userLoggedin(user) {
    console.log("user successfully logged in");
    
    var welcomeScript = $('#welcome-template').html();
    var welcomeTemplate = Handlebars.compile(welcomeScript);
    var welcomeHTML = welcomeTemplate(user);
    
    $('.main-container').html(welcomeHTML);
}

function gotError(error) {
     Materialize.toast('You are wrong!', 4000)
    console.log("Error message - " + error.message);
    console.log("Error code - " + error.code);
}

