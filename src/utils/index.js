
import forge from "node-forge";
import env from "../config/env.js";
export const getEnvVariable = (key) => { 
  
  const value = process.env[key.toUpperCase()] || process.env[key.toLowerCase()] 
  if(!value){
    throw new Error(`Envinronment variable ${key} not set. App will not start. Please set and restart`)
  }
  if(value.toLowerCase() === "false" ){
    return false
  }
  if(value.toLowerCase() === "true" ){
    return true
  }
  return value
}


export const flutterwaveDES3Encrypt = (payload) =>{
    const text = JSON.stringify(payload);
    const cipher = forge.cipher.createCipher(
        "3DES-ECB",
        forge.util.createBuffer(env.flutterwaveEncryptionKey)
    );
    cipher.start({iv: ""});
    cipher.update(forge.util.createBuffer(text, "utf-8"));
    cipher.finish();
    const encrypted = cipher.output;
    return forge.util.encode64(encrypted.getBytes());
}
