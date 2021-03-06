$(function () {
    var APPLICATION_ID = "93083082-4047-A573-FFDA-0A76A3F95400",
            SECRET_KEY = "1401910F-F187-063B-FFAA-17B1D8821B00",
            VERSION = "v1";
    Backendless.initApp(APPLICATION_ID, SECRET_KEY, VERSION);
    var postsCollection = Backendless.Persistence.of(Posts).find();
    console.log(postsCollection);
    var wrapper = {
        posts: postsCollection.data
    };
    Handlebars.registerHelper('format', function (time) {
        return moment(time).format("dddd, MMMM Do YYYY");
    });
    var blogScript = $("#blogs-template").html();
    var blogTemplate = Handlebars.compile(blogScript);
    var blogHTML = blogTemplate(wrapper);
    $('.main-container').html(blogHTML);
    $(document).on('submit', '.form-add=blog', function (event) {
        event.preventDefault();
        var data = $(this).serializeArray(),
                title = data[0].value,
                content = data[1].value;
        var dataStore = Backendless.Persistence.of(Posts);
        var postObject = new Posts({
            title: title,
            content: content

        });
    });
    $(document).on('click', '.add-blog', function () {
        var addBlogScript = $("#add-blog-template").html();
        var addBlogTemplate = Handlebars.compile(addBlogScript);
        $('.main-container').html(addBlogTemplate);
    });
    $(document).on('submit', '.form-add-blog', function (event) {
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
        this.content.value = "";
    });
    $(document).on('click', '.trash', function (event) {
        console.log(event);
        Backendless.Persistence.of(Posts).remove(event.target.attributes.data.nodeValue);
        location.reload();
    });
});
function Posts(args) {
    args = args || {};
    this.title = args.title || "";
    this.content = args.content || "";
    this.authorEmail = args.authorEmail || "";
}
