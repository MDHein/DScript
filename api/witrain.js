let replyBox = [];
async function loadReplyBox() {
 let response = await
 fetch("https://raw.githubusercontent.com/MDHein/DScript/main/api/wiai.json");
 if (!response.ok) {
  throw new Error('JSON: Network response was not ok');
 }
 replyBox = response.json();
 console.log(replyBox);
}
loadReplyBox();

function getMessage(words) {
 for (var i in replyBox) {
  var wordslist = replyBox[i].part1;
  for (var ii in wordslist) {
   var statelist = wordslist[ii].sentence;
   for (var iii in statelist) {
    var one = statelist[iii].one;
    var two = statelist[iii].two;
    var three = statelist[iii].three;
    if (one.includes(words)) {
     var classify = replyBox[i].part2;
     var response = replyBox[i].part3;
     if (three === "-") {

      let reply = response;
      console.log(reply);
      return reply;
     } else
      if (three.startsWith("-")) {
      three = three.replace("-", "");
      let reply = response + three;
      console.log(reply);
      return reply;
     } else
      if (three.endsWith("-")) {
      three = three.replace("-", "");
      console.log(three);
      return three;
     }
     let reply = three + response;
     console.log(reply);
     return reply;
    }
   }
  }
 }
 return "No answer!";
}

function addWord(words, state, reply, generalState, generalReply) {

 let data = {
  part1: [{
   sentence: [{
    one: words,
    two: state,
    three: reply
   }]
  }],
  part2: generalState,
  part3: generalReply
 };
 replyBox.push(data);
 console.log(replyBox);
}

addWordInPart1("NewWords", "NewState", "NewOk", "Test");
function addWordInPart1(words, state, reply, group) {
 for (var i in replyBox) {
  let g = replyBox[i].part2;
  if (g === group) {
   let data = {
    one: words,
    two: state,
    three: reply
   };
   replyBox[i].part1.push({
    sentence: [data]
   });
  }
 }
 console.log(replyBox);
}
function addWordInSentence(words, state, reply, group) {
 for (var i in replyBox) {
  let g = replyBox[i].part2;
  if (g === group) {
   let sentenceList = replyBox[i].part1[0].sentence; // Access 'part1' as an array
   let data = {
    one: words,
    two: state,
    three: reply
   };
   sentenceList.push(data);
   replyBox[i].part1[0].sentence = sentenceList; // Access 'part1' as an array
  }
 }
 console.log("JSON: "+ JSON.stringify(replyBox, null, 2));
}