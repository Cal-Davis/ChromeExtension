
let myLeads = []
let inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
let deleteBtn = document.getElementById("delete-btn")


const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")
// const tabs = [
//     {url: "https://www.linkedin.com/in/per-harald-borgen/"}
// ] ------ this was just an example


// 1. Check if leadsFromLocalStorage is truthy
// 2. If so, set myLeads to its value and call renderLeads()

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

// Listen for double clicks on the delete button (google it!)
// When clicked, clear localStorage, myLeads, and the DOM
deleteBtn.addEventListener("dblclick",function (){
    console.log("double clicked!")
    localStorage.clear()
    myLeads = []
    render(myLeads)

})

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        console.log(tabs.url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})




inputBtn.addEventListener("click", function(){
    console.log("clicked")
    myLeads.push(inputEl.value)
    inputEl.value = ""

    // Save the myLeads array to localStorage 
    localStorage.setItem("myLeads",JSON.stringify(myLeads))

    // myLeads = JSON.stringify(myLeads)
    render(myLeads)
    
    // To verify that it works:
    console.log( localStorage.getItem("myLeads") )
    // renderLeads()
    
    console.log(myLeads)
    
   
}
)

function render(leads){
let listItems = ""
for (let i = 0; i < leads.length; i++) {
    listItems += 
    `<li>
            <a href = "${leads[i]}"  target = "_blank">
            ${leads[i]}
            </a>
     </li>`
}
ulEl.innerHTML = listItems
}

