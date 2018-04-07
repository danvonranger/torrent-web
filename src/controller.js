const poller = ()=> {
    console.log('Here we go a polling...');
    const data = [
        {name: "One"},
        {name: "Two"},
        {name: "Three"},
        {name: "Four"},
        {name: "Five"}
    ];

    for(let n of data){
        console.log(n.name);
        //await delay(5000);
    }
}

// const delay = async (duration) => {
//     return await function(){
// 		return new Promise(function(resolve, reject){
// 			setTimeout(function(){
// 				resolve();
// 			}, duration)
// 		});
// 	};
// }

module.exports = {
    poller
}