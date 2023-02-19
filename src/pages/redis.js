import { connect } from "https://deno.land/x/redis/mod.ts";

let redis = null

async function init(){
    redis = await connect({
      hostname: "redis-19765.c55.eu-central-1-1.ec2.cloud.redislabs.com",
      port: 19765,
      password: Deno.env.get("REDIS_COUNTER")
    });
}

async function increment(){
    let counter = await redis.get("counter");
    if(isNaN(counter)){
        counter = 0
    }

    const new_val = parseInt(counter) + 1
    console.log(`new_val = ${new_val}`)
    const result = await redis.set("counter", new_val.toString());
    console.log(result)
}

async function get_count(){
    const counter = await redis.get("counter");
    return parseInt(counter)
}

init().then(()=>{
    console.log("connected")
})

export{
    get_count,
    increment
}
