exports.getHomePage=(req,res,next)=>{
    //res.send("Hello World");
    res.render('home',{
        title:'Home page'
    });
};