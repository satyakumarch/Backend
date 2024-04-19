import app from "./app.js"

app.listen(process.env.PORT,()=>{
console.log(`server running on port ${process.env.PORT}`);

});