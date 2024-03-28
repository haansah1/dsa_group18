

function countWords(textString) {
    // so we take it as a string.
    /**
     * first of all we need to split it into an array of words
     * let's say we hae a hash map. So we take each word
     * and we
     *
     */
    let wordDict = {};
    let currentWord = "";
    let currentIndex = 0;
    let currentWordIndex = 0;
    let mostFrequentWords = []; // of size 100, that is.
  
    while (textString[currentIndex]) {
      // if (!(`\n .!?"':;,@!@#$%^&*()-+={}|`.includes(textString[currentIndex])) && !('//\\'.includes(textString[currentIndex]))) {
      if (!(`\n .!?"':;,@!@#$%^&*()-+={}|`.includes(textString[currentIndex])) && !('//\\'.includes(textString[currentIndex]))) {
        currentWordIndex = currentIndex;
  
        // another loop to determine the end of the word.
        // while (textString[currentIndex] && textString[currentIndex] != " ") currentIndex++;
        while (textString[currentIndex] && !(`\n .!?"':;,@!@#$%^&*()-+={}|`.includes(textString[currentIndex])) && !('//\\'.includes(textString[currentIndex]))) currentIndex++;
  
        // at the end of this loop, we must have reached a ' '
        currentWord = textString.slice(currentWordIndex, currentIndex);
        currentWord = currentWord.toLowerCase();

        if (currentWord in wordDict) {
          // let wasAlreadyThere = true
          wordDict[currentWord]++;
        } else {
          // let wasAlreadyThere = true
          wordDict[currentWord] = 1;
        }
  
        // if you were already in the list, then we just do the swapping (if necessary)
        if (mostFrequentWords.includes(currentWord)) {
          // swapping logic here
  
          // console.log("swapping action...")
          while (
            mostFrequentWords.indexOf(currentWord) >= 0 &&
            wordDict[currentWord] > wordDict[mostFrequentWords[mostFrequentWords.indexOf(currentWord) - 1]]
          ) {
            let modalIndex = mostFrequentWords.indexOf(currentWord); // remember it can't appear in the list twice
            let prevModalIndex = modalIndex - 1;
            if (prevModalIndex >= 0) {
              if (wordDict[currentWord] > wordDict[mostFrequentWords[prevModalIndex]]) {
                // swap the two.
                let temp;
                temp = currentWord;
                mostFrequentWords[modalIndex] = mostFrequentWords[prevModalIndex];
                mostFrequentWords[prevModalIndex] = temp;
              }
            }
          }
        }
  
        // else we check if there's space. If there's space, we add you (that's it. No swapping required since you'd be the last)
        else {
          // check if there's space
          if (mostFrequentWords.length < 100) {
            mostFrequentWords.push(currentWord); // and that ends it. (No swapping required since you'd be the last)
            // console.log("pushing " + currentWord)
          } else {
            // now if there's no space, then we check if there's a chance for you to make the list
            // so we check your frequency, and see if you're more than the last person in the list
            if (wordDict[currentWord] > wordDict[mostFrequentWords[99]]) {
              // if you're more, then we remove that guy from the list, and put you
              mostFrequentWords[99] = currentWord;
  
              // swapping logic here
              while (
                mostFrequentWords.indexOf(currentWord) >= 0 &&
                wordDict[currentWord] > wordDict[mostFrequentWords[mostFrequentWords.indexOf(currentWord) - 1]]
              ) {
                let modalIndex = mostFrequentWords.indexOf(currentWord); // remember it can't appear in the list twice
                let prevModalIndex = modalIndex - 1;
                if (prevModalIndex >= 0) {
                  if (wordDict[currentWord] > wordDict[mostFrequentWords[prevModalIndex]]) {
                    // swap the two.
                    // console.log("swapping action...");
                    let temp;
                    temp = currentWord;
                    mostFrequentWords[modalIndex] = mostFrequentWords[prevModalIndex];
                    mostFrequentWords[prevModalIndex] = temp;
                  }
                }
              }
            }
          }
        }
  
        /* end */
        // ---------------------------
      } else currentIndex++;
    }
  
    let final = [];
    for (word of mostFrequentWords) {
      final.push([word, wordDict[word]]);
    }
  
    return final;
  
    //
  }
  


const wordsContainer = document.querySelector("#words-container")
// wordDiv = document.querySelector(".word-div")
document.getElementById('inputfile').addEventListener('change', function () {

      // document.querySelector("form").submit();
      wordsContainer.innerHTML = ''

        let fr = new FileReader();
        fr.onload = function () {
            // console.log(fr.result);

            // console.log(fr.fileName)

            let output = countWords(fr.result);
            for (let res of output) {
                let wordDiv = document.createElement("div");
                // wordDiv.classList.a = 'word-div';
                wordDiv.classList.add("active");
                bool = false;
                if(res[1]>1){
                    bool = true
                }
                wordDiv.innerHTML = `<div class='word'> ${res[0]} </div>    <div class='count'> ${res[1] + (bool ? " times" : " time")}</div>`;
                wordsContainer.appendChild(wordDiv);
            }

            document.querySelector(".gen").style.display = "flex"
        }

        fr.readAsText(this.files[0]);
    })


document.querySelector("#count").addEventListener('click', () => {
  wordsContainer.innerHTML = ''

      let output = countWords(document.querySelector("input[type=text]").value);
      // console.log(output)
      for (let res of output) {
          let wordDiv = document.createElement("div");
          // wordDiv.classList.a = 'word-div';
          wordDiv.classList.add("active");
          bool = false;
          if(res[1]>1){
              bool = true
          }
          wordDiv.innerHTML = `<div class='word'> ${res[0]} </div>    <div class='count'> ${res[1] + (bool ? " times" : " time")}</div>`;
          wordsContainer.appendChild(wordDiv);
      }

      document.querySelector(".gen").style.display = "flex"
})