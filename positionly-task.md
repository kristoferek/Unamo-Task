Let’s play with React!

Description:
Your task is to create an app which will add users to an existing array of current users with React.js (in jsx syntax).  
Please follow the design - https://www.dropbox.com/sh/oaj3niiu6ujjxip/AAC2PP5zM5kzowt7v-DyIVhva?dl=0

Step 1:
Create an array of current users. Each user should have following properties: id, name and email.  

Step 2:
Display table with current users.

Step 3:
Create a button named “Add a user”. A form should be displayed after click on the button. 
The form should include 2 inputs: Name and Email,  and submit button. When form appears first input gets focus.
Please prepare form validation:
Name - input accepts only letters, not longer than 20 characters.
Email - input accepts only email format. Note: do not use input[type=”email”]!.

There can’t be two users with the same email address in the table.

The maximum amount of users that can be displayed in the table is 10. 
If the limit is reached, the button “Add a user” should be disabled and proper information about reached limit should be displayed.

Step 4:
After click on submit button following actions should be conducted:
New user is added to the array of current users and displayed as a first row in the table.
Form disappears.
Proper notification is displayed.

Step 5:
After click on “X” in last column in users table, selected user should be deleted from the table and the users array. 
If there are no users in a table please display a proper placeholder.

Step 6:
Add reset form button which will appear next to submit button only if any input in form has a value. 
Click on reset button should clear the form. 

Please host your solution in a private repo - you can use https://bitbucket.org - and grant access to following logins: "emq" and "pendzela".

Good luck !