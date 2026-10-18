import {readdir,rm} from 'node:fs/promises';
import path from 'node:path';
const directory=process.env.LEAD_RATE_LIMIT_DIR;
if(!directory||!path.isAbsolute(directory)||directory==='/')throw Error('Set LEAD_RATE_LIMIT_DIR to the dedicated absolute operational-state directory.');
let removed=0;
for(const group of ['rates','submissions']){const base=path.join(directory,group);let names;try{names=await readdir(base);}catch(e){if(e.code==='ENOENT')continue;throw e;}for(const name of names){if(/^\d+$/.test(name)&&Number(name)<Math.floor(Date.now()/3600000)-2){await rm(path.join(base,name),{recursive:true,force:true});removed++;}}}
console.log(JSON.stringify({event:'operational_state_pruned',removedBuckets:removed}));
