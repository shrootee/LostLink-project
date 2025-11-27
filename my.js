// After validation and before redirect


// storing email and password in local storage 
    const email = localStorage.getItem("userEmail");
    const password = localStorage.getItem("userPassword");

//accessing
     const emailpart=email.split("@");     // note : information cannot be directly split first store it into a variable
    const nameprn=emailpart[0];

//user data to be displayed by changing inner text 
    document.getElementById("userData").textContent = 
       "User Information :"+" "+"Name.PRN :"+" " + nameprn +" "+" DOB: " + password;
       