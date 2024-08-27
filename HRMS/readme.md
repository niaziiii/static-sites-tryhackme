# Web App (SSRF) HRMS

## Introduction

This web app is an HRMS system with limited functionality. The first screen is a login screen that allows users to log in. Within our SSRF room, we will be demonstrating different SSRF techniques.

1. **Basic SSRF**
   Here, we showcase an SSRF attack against a local server. The login credentials can be found in the `config.php` file. To access these credentials, navigate to the `/config` route. When visiting `/abc` or `/home`, it automatically redirects to the `/copyright` route for `copyright.php`. This gives the first flag.

2. **Basic SSRF (Accessing Internal Server)**
   After accessing the `config.php` file, you can use the credentials to log in to the HRMS system. Upon logging in, you will see a dashboard with a list of employees and their departments from the `/details` route. Users can then access the `/admin` route, by changing the iframe url from `employee.php` to `admin.php` which will display a flag value along with a simple message.

3. **Blind SSRF**
   Once the user logs into the dashboard, there will be a menu icon for training. Clicking it will fetch training content from another URL. For example, using the URL `url.php?id=192.168.1.1/trainningbanner.jpg` will show a simple image. This means you can access `/url` route to see the code of `url.php`. Now we can try sending request to `url.php?id=192.168.1.1/bigImage.jpg` which will display a message on the screen saying "Greater than 100 KB." and a flag value.

4. **Blind SSRF (with out-of-band)**
   Similar to Blind SSRF, the difference here is that if you visit the URL `profile.php?url=10.10.10.10/myserver.php`, an AJAX call is made to `/myserver.php?url=10.10.10.10/myserver.php`. When `myserver.php` receives the request, it sends a response with all server-related information to this page, such as `phpinfo()` information.

   ```json
   {
     "message": "Data sent successfully",
     "url": "10.10.10.10/myserver.php",
     "serverInfo": "...."
   }
   ```
