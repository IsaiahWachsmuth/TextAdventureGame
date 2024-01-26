CLIENT:
Change directory to client.
Requires "npm install" and "npm install react-router-dom".
The new pages that display database info are under the "image" of the landing page.
Links are included as well as basic interaction with the database.

SERVER:
Change directory to server.
Model and Controller require "npm install mongoose", "npm install MongoDB", "npm install cors", and "npm install express". Running "node adventures_controller.mjs".
In "adventures_model.mjs", if you decide to change your connection at line 3:
mongoose.connect(
    "mongodb+srv://{name}:{password}@textadventurecluster.fpuqlbf.mongodb.net/TextAdventures?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
Make sure you include this full section "textadventurecluster.fpuqlbf.mongodb.net/TextAdventures?retryWrites=true&w=majority" or the db will not connect.
Listening begins on port 3001.
