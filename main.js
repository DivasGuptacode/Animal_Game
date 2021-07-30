const readlineSync = require('readline-sync');
const fs = require("fs");

const changedTree = fs.readFileSync('tree.json');
const root = JSON.parse(changedTree)



/*function setupTree(){
    let root={}
    root.question="Can it fly?";
    root.yes={}
    root.yes.question="Can it swim?"
    root.yes.yes={animalName:"Duck"}
    root.yes.no={animalName:"Parrot"}

    root.no={}
    root.no.question="Is it a pet?"
    root.no.yes={animalName:"Dog"}
    root.no.no={animalName:"Monkey"}

    return root
}*/

//let findTreeRoot=setupTree()

function doRound(node){
    if(node.question){
        let answer=readlineSync.question(node.question)
        if(answer==='yes'){
            doRound(node.yes)
        }
        else{
            doRound(node.no)
        }
    }
    else{
        let answer=readlineSync.question("Is it "+node.animalName+"?")
        if(answer==='yes'){
            console.log("Found it")
        }
        else{
            console.log('OOPS, help for improvement.')
            let newAnswer=readlineSync.question('Who was the animal?')
            let newQuestion=readlineSync.question('How to distinguish?')
            node.question=newQuestion;
            node.no={}
            node.yes={}
            let a1=readlineSync.question("For "+newAnswer+" is the answer yes or no?")
            if(a1==='yes'){
                node.yes.animalName=newAnswer
                node.no.animalName=node.animalName
            }
            else{
                node.no.animalName=newAnswer
                node.yes.animalName=node.animalName
            }
            delete node.animalName
            console.log("Thanks for improvement")
        }
    }
    var changedTree = JSON.stringify(root, null, 2);
    fs.writeFileSync('tree.json', changedTree)
}

let trueOrfalse=true
while(trueOrfalse){
    console.log('Think of an animal')
    doRound(root)
    trueOrfalse=readlineSync.question('wanna continue?(y/n)')
    if(trueOrfalse=='y')
    trueOrfalse=true
    else
    trueOrfalse=false
}
