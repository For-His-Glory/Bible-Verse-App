async function fetchDailyVerse() 
/*  + This goes to the Bible.org API and grabs a random verse 
    + [async]: This allows us to use [await] within the [function]
    + [function]: Defining a reusable block of code [the machine] 
    + [fetchDailyVerse()]: The function name of this particular Function */

{   /* The opening of the [fetchDailyVerse] Function */

    try /* Used so if something goes wrong, the program doesn't crash. It "catches" the error and handles it    
    gracefully */

    { /* The opening of the [try] block */

      const res = await fetch('https://labs.bible.org/api/?passage=random&type=json'); 
      /*    + This conducts the task of requesting a random verse from Bible.org
            + [res]: Response/result from the [fetch] request to the presented URL [Bible.org] we conducted
            + [await]: Tells JS to pause until the Promise is resolved from our [fetch] request
            + [fetch()]: Tells the browser to go to the presented website within the "()" and get the data */

      const data = await res.json();
      /*    + This makes sure that the data returned from our [fetch] request is usable, by converting it to [.
            json]
            + [data]: The title of this particular Variable 
            + [await]: Tells JS to pause until the data that was returned is converted to [.json] 
            + [res.json()]: Converts the received data from the [res] Variable above into a usable format in JS */

      const verse = data[0];
      /*    + Because the API "wraps" the data in a list [called "array"], we have to define that we want the 
            FIRST item [Item 0] 
            + [verse]: The title of this particular Variable 
            + [data]: The data that returned from our [fetch] request, the Variable above
            + [0]: Our request to see the FIRST item presented by the API's Array */

      const verseText = `"${verse.text}" - ${verse.bookname} ${verse.chapter}:${verse.verse}`;
      /*    + This makes sure that the data is presented in a coherent, legible manner [ "For God so loved the 
            world..." - John 3:16] 
            + This is called a "Template String"
            + [verseText]: The title of this particular Variable 
            + ["${verse.text}"]: The actual verse being used 
            + ["${verse.bookname}]": The book within the Bible being referenced 
            + ["${verse.chapter}"]: The chapter being referenced 
            + ["${verse.verse}"]: The verse being referenced */

      document.getElementById('Verse-Box').innerText = verseText;
      /*    + This finds the "Element" within "Daily_Verse.html", using the "ID" [Verse-Box]
            + [document]: Refers to the HTML 
            + [.getElementById('Verse-Box')]: Searches the "Daily_Verse.html" for an element named [Verse-Box] 
            + [.innerText]: This is the visible text within the element [Verse-Box], what the user sees 
            + [= verseText]: Assigns a new value to the element [.innerText] i.e. whatever [verseText] contains will now show up on the page and the user will see it */
    
      localStorage.setItem('dailyVerse', verseText); 
      /*   + This stores the verse in the browser's memory, so we don't need to re-fetch it every time the 
            window is refreshed 
            + [localStorage]: Tells HTML to retain the following information locally
            + [.setItem()]: Indicates to HTML what we want it to retain locally. It uses a "key" [dailyVerse] and "value" [verseText]
            + [dailyVerse]: The "key" 
            + [verseText]: The "value", referenced two sections above */

    }   /* This closes the [try] block */

    catch (err) /* This is related to the above-mentioned [try{}] and is used to "catch" an error and handle it gracefully */

    { /* The opening of the [catch] block */
      console.error('Failed to Vetch Verse:', err);
      /*    + This prints an error that the user can see on the webpage
            + Similar to [console.log], but presents in red 
            + This helps identify what happened with the error, as opposed to the webpage simply failing */
    } /* This closes the [catch] block */

}   /* This closes the [fetchDailyVerse] function */
  
const accessKey = 'MQNYM8b0KlUge37gRFHjVTO4mSP5bV9m82o42Mlw9T0';
/*  + This creates a Variable titled [accessKey]
    + ['MQNYM8b0KlUge37gRFHjVTO4mSP5bV9m82o42Mlw9T0']: The Access Key obtained from Unsplash for this specific app
    + Think of this like a VIP pass to the "image buffet" lol */
  
fetch(`https://api.unsplash.com/photos/random?client_id=MQNYM8b0KlUge37gRFHjVTO4mSP5bV9m82o42Mlw9T0&query=nature`)
/*  + This Function conducts a request from Unplash for a random image, in particular, one from nature
    + [photos/random]: The API end point that returns one random photo
    + [client_id=MQNYM8b0KlUge37gRFHjVTO4mSP5bV9m82o42Mlw9T0]: This references my specific Access Key 
    + [query=nature]: This tells Unsplash I want photos associated with "nature" 
    + This line of code returns a "Promise" that "Resolves" into a response from the server 
    + "Promise": A placeholder for a value that WILL exist in the future [Even though the internet APPEARS to be instantaneous, it does take time.  The "Promise" is simply the API saying, "You will get a result, just sit tight".  The result "Resolves" and replaces the "Promise"]
    + "Resolves": The request has been completed and the "Promise" can now be replaced with the actual result */

    .then(response => response.json())
    /*  + This converts the received data from Unsplash into a usable format i.e. [.json()]
        + [.then]: "Chains" a Function to run AFTER the previous Promise resolves 
        + [response =>]: This is an "Arrow Function" and takes the [response] that was obtained by the [fetch] request 
        + [response.json()]: CONVERTS the returned [response] into a usable JS format [.json()] */
       
    .then(data => 
    /*  + This is where we actually USE the data the API provided 
        + [.then]: "Chains" a Function to run AFTER the previous Promise resolves 
        + [(data =>{}]: Creates a function that utilizes that data we just obtained [the .json images] */

        { /* This is the opening of the details within the [data] Function */

        const imgUrl = data.urls?.regular;
        /*  + This Variable extracts the image we want to use 
            + [const]: The declaration for the new Variable
            + [imgUrl]: The title of this particular Variable
            + [data]: This is the [.json] image I previously requested from the API 
            + [data.urls]: Accesses the [urls] property of the [data] object 
            + [?.]: "Optional Chaining" safely checks if [urls] exists before trying to get [.regular].  Without this, if an error occurred it would crash, however, this "gracefully" shows an error if one occurs
            + [.regular]: The actual URL string of the regular-sized image */

        if (imgUrl) /* This checks to confirm an image was actually obtained.  [If] yes, proceed.  [If] no, skip the rest and don't display an image */

            { /* This is the opening of the [if()] statement */

              document.body.style.backgroundImage = `url('${imgUrl}')`;
              /*    + This converts the entire website's background image to the [fetched] URL 
                    + "Hey browser, take the <body> of this webpage and set its background image to whatever URL is stored in [imgUrl]" 
                    + [document]: This refers to the entire Webpage
                    + [.body]: Targets the <body> tag of the HTML page 
                    + [.style]: Accesses the CSS styles of that body element
                    + [.backgroundImage]: Specifically alters the [background-image] CSS property 
                    + [`url('${imgUrl}')`]: "Template Literal" that builds the proper [url()] syntax for CSS by inserting the [imgUrl] variable stated above */

              localStorage.setItem('dailyBG', imgUrl)
              /*    + This saves the image URL in the browser's [localStorage] and labels it [dailyBG]
                    + [localStorage]: A built-in web API that lets the site store key/value data in the user's browser, even after a refresh/reboot 
                    + [.setItem()]: A method used to save the actual data ['dailyBG', imgUrl]
                    + ['dailyBG']: The "key" name/label, like a file name
                    + [imgUrl]: The value being stored that was created above [The fetched image in this case] */

            } /* This closes the [if()] statement */

        } /* This closes the details within the [data] Function */

    ) /* This closes the entire [data] Function */

/* TO DO LIST */
/*  + Create the [midnightSchedule] functionality
    + Make the "Share Button" usable */

fetchDailyVerse(); 
/*  + THIS WAS A DEBUG [Failure to retrieve a new verse upon window refresh]
    + I never "called" this particular function */
  