

function countWords (textString) {
    // so we take it as a string.
    /**
     * first of all we need to split it into an array of words
     * let's say we hae a hash map. So we take each word
     * and we
     * 
     */
    let wordDict = {}
    let currentWord = ""
    let currentIndex = 0
    let currentWordIndex = 0
    let mostFrequentWords = [] // of size 100, that is.

    while (textString[currentIndex]) {
        if (textString[currentIndex] != ' ') {
            currentWordIndex = currentIndex

            // another loop to determine the end of the word.
            while (textString[currentIndex] && textString[currentIndex] != ' ')
                currentIndex++;

            // at the end of this loop, we must have reached a ' '
            currentWord = textString.slice(currentWordIndex, currentIndex)
            if (currentWord in wordDict) {
                let wasAlreadyThere = true
                wordDict[currentWord]++;
            }
            else{
                let wasAlreadyThere = true
                wordDict[currentWord] = 1;

            }

            // ---------------------
            /* doing our array work */
            // so let's say we have words being thrown at us, and at the end of the throws we want to find the 100 most frequent words
            // the first method is just about looking at the dict. No matter the case, we can't just start printing now.
            // but we can store them in the dict in such a way that we can achieve this "orderingByFrequency"
            // Thing is, I'm thinking of using an array alongside, such if I find that you're more than someone, we'll fix you somewhere
            // in the array, so that after we're done, we just print the array out and we'll be good.
            // so let's say the first person comes with 1. We just put him in the first index (index 0) after storing him and his frequency
            // in the dict.
            // Then let's say the next word thrown is still the same guy.
            // So we update him in the dict, (if he's already in the dict), then we just leave the list alone.
            // THen say, someone new comes in. What happens is that we will update the dict. If we know that he wasn't in the dict, 
            // then we check if the list is not upto 100 yet. If there's space, then we put him there.
            // But now let's say the same guy comes again, We update him in the dict, (if he's already in the dict, what we want to
            // do is to check his frequency in the dict. If he's higher than the one preceeding him, then we swap their positions,
            // until we find where he should be in the list.
            // Now what if someone comes, but the list is already full, but he'd become the most occuring?
            // Well, what we can assume is that, our list is sorted by mode. So we'll still record him in the db, but we check if he's more
            // than the last person in the list. If he's more than the last person, we push him as the last person. Then subsequently, when
            // he comes again, we update him in the dict, and check if he's higher than the preceding him. then we swap the positions.
            // until we find where he should be in the list. (This would always happen...)


            // first check if the array is not full, then we push him in, then swap till we find where he should be.
           
            // if you were already in the list, then we just do the swapping (if necessary)
            if (mostFrequentWords.includes(currentWord)) {
                // swapping logic here

                // console.log("swapping action...")
                while ((mostFrequentWords.indexOf(currentWord) >= 0) &&  wordDict[currentWord] > wordDict[mostFrequentWords[mostFrequentWords.indexOf(currentWord)-1]]) {
                    let modalIndex = mostFrequentWords.indexOf(currentWord); // remember it can't appear in the list twice
                    let prevModalIndex = modalIndex - 1
                    if (prevModalIndex >= 0) {
                        if (wordDict[currentWord] > wordDict[mostFrequentWords[prevModalIndex]]) {
                            // swap the two.
                            let temp;
                            temp = currentWord
                            mostFrequentWords[modalIndex] = mostFrequentWords[prevModalIndex]
                            mostFrequentWords[prevModalIndex] = temp;
                        }
                    }
                }

            }

            // else we check if there's space. If there's space, we add you (that's it. No swapping required since you'd be the last)
            else {
                // check if there's space
                if (mostFrequentWords.length < 100) {
                    mostFrequentWords.push(currentWord) // and that ends it. (No swapping required since you'd be the last)
                    // console.log("pushing " + currentWord)
                }

                else {
                    // now if there's no space, then we check if there's a chance for you to make the list
                    // so we check your frequency, and see if you're more than the last person in the list
                    if (wordDict[currentWord] > wordDict[mostFrequentWords[99]]) {
                        // if you're more, then we remove that guy from the list, and put you
                        mostFrequentWords[99] = currentWord
                        
                        // swapping logic here
                        while ((mostFrequentWords.indexOf(currentWord) >= 0) &&  wordDict[currentWord] > wordDict[mostFrequentWords[mostFrequentWords.indexOf(currentWord)-1]]) {
                            let modalIndex = mostFrequentWords.indexOf(currentWord); // remember it can't appear in the list twice
                            let prevModalIndex = modalIndex - 1
                            if (prevModalIndex >= 0) {
                                if (wordDict[currentWord] > wordDict[mostFrequentWords[prevModalIndex]]) {
                                    // swap the two.
                                    console.log("swapping action...")
                                    let temp;
                                    temp = currentWord
                                    mostFrequentWords[modalIndex] = mostFrequentWords[prevModalIndex]
                                    mostFrequentWords[prevModalIndex] = temp;
                                }
                            }
                        }
                    }
                }

            }

            /* end */
            // ---------------------------
            




        }
        else
            currentIndex++;
    }

    let final = []
    for (word of mostFrequentWords){
       final.push([word, wordDict[word]])
    }

    return final
    
    // 
}



const wordsContainer = document.querySelector("#words-container")
// wordDiv = document.querySelector(".word-div")
document.getElementById('inputfile').addEventListener('change', function () {

        let fr = new FileReader();
        fr.onload = function () {
            console.log(fr.result);
            let output = countWords(fr.result);
            for (let res of output) {
                let wordDiv = document.createElement("wordDiv");
                wordDiv.classList.add("active");
                bool = false;
                if(res[1]>1){
                    bool = true
                }
                wordDiv.innerHTML = res[0]+ "  appears  " + res[1] + (bool ? " times" : " time") ;
                wordsContainer.appendChild(wordDiv);
            }
        }

        fr.readAsText(this.files[0]);
    })
// --
/**
 * how to handle other delimiters for the words the text
 * how to find the most frequent words
 */