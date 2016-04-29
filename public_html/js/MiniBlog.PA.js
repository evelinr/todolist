$(function () {
    var  APPLICATION_ID = "93083082-4047-A573-FFDA-0A76A3F95400",
         SECRET_KEY = "1401910F-F187-063B-FFAA-17B1D8821B00",
         VERSION = "v1";
         
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION); 
    
   var postsCollection = Backendless.Persistence.of(Posts).find();
   
   console.log(postsCollection);
   
   var wrapper = {
       posts: postsCollection.data
   };
   
   var blogScript = $("#blogs-template").html();
   var blogTemplate = Handlebars.compile(blogScript);
   var blogHTML = blogTemplate(wrapper);
   
   $('.main-container').html(blogHTML);
    
    
});

function Posts(args){
   args = args || {};
   this.title = args.title || "";
   this.content = args.content || "";
   this.authorEmail = args.authorEmail || "";
}
