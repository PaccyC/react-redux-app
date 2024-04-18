const logger = store=>next=>action=>{
    console.log("Store",store);
    console.log("Next",next);
    console.log("Action",action);

   return next(action)
}


export default logger;