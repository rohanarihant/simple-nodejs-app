<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
    <form method="post" action="/sign">
    	<label>Username</label>
    	<p>
    	<input type="username" name="username">
    	</p>
    	<label>Email</label>
    	<p><input type="email" name="email"></p>
    	<label>Phone</label>
    	<p><input type="text" name="phone"></p>
    	<label>Password</label>
    	<p><input type="password" name="password"></p>
    	<input type="submit" value="signup">
    	<a href="/login">Login here</a>
   		</form>
  </body>
</html>
