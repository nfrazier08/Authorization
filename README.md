# Authorization

This is a personal project with the goal of understanding authenitication better. I created a dummy site where users can register an account, log in and log out. When the user registers with the site, their information is stored in a database and their password is hashed. When the user attempts to log back into the site, the logic compares their plain-text password to the hashed password in the database. If they successfully log-in, they are redirected to their dummy profile page. Otherwise, they are re-directed back to the log in page. 

Stretch goals:
1. Send errors back to the page that notifies the user if their password or username is incorrect. 
2. Deploy this to heroku- experiencing issues connecting sql, passport and heroku
3. Provide better dummy content for the site

