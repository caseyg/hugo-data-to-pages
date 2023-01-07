#!/usr/bin/env node
'use strict';

const fs = require('fs');
const fse = require('fs-extra');
var dir = require('node-dir');

const { toHTML } = require("slack-markdown");
const { resourceLimits } = require('worker_threads');

// var dev = 'dev_'
var dev = ''

var dataFiles = dir.files('data/' + dev + 'messages', {sync:true});

const convertToObject = (file) => {
    const filetype = file.split('.').pop();
    const fileContent = fs.readFileSync(file, 'utf8');
    if (filetype === 'json') return JSON.parse(fileContent);
};

const build = async () => {
    if (dataFiles.length < 1) return console.log('No data files');
    const users = JSON.parse(fs.readFileSync('data/users.json', 'utf8'));
    
    for (let i in dataFiles) {
        let data = convertToObject(dataFiles[i]);
        let channel = dataFiles[i].split("/")[2];
        
        function slackUser(uid, text) {
            const username = users.find(user => user.id === uid) ? users.find(user => user.id === uid).profile.real_name : uid;
            return text.replace(/@[A-Z0-9]+/, `@${username}`);
          }
          if (Array.isArray(data)) {
            for (let j = 0; j < data.length; j++) {
              const pagePath = dev + 'content/' + data[j].ts;
              
              fse.ensureDirSync(dev + 'content/');
              
              let date_array = data[j]["ts"].split('.');
              
              data[j]["date"] = new Date(date_array[0] * 1000).toISOString();
              data[j]["ts_int"] = date_array[1];
              data[j]["channel"] = channel;
              
              const uids = data[j]['text'].match(/@[A-Z0-9]+/);
              if (Array.isArray(uids)) {
                data[j]['text_processed'] = uids.reduce((text, uid) => slackUser(uid.substring(1), text), toHTML(data[j]['text']));
              } else {
                data[j]['text_processed'] = toHTML(data[j]['text']);
              }
              fs.writeFileSync(pagePath + '.md', JSON.stringify(data[j]) + '\n');
              console.log('Created file: ' + pagePath + '.md');
            }
          }

        // for (let j in data) {
        //     const pagePath = dev + 'content/' + data[j].ts;
            
        //     fse.ensureDirSync(dev + 'content/');
            
        //     let date_array = data[j]["ts"].split('.');
            
            
        //     function slackUser(text) {                
        //         const uids = text.match(/@(.{9}).*?/g);
        //         if (Array.isArray(uids)) {
        //             uids.forEach(uid => {
        //                 uid = uid.substr(1, 9);
        //                 const username = users.find(user => user.id === uid) ? users.find(user => user.id === uid).real_name : "user";
        //                 return text = text.replace(new RegExp(`@${uid}`), `@${username}`); 
        //             });
        //             return text;
        //         }
        //         return text;
        //     }
            
        //     data[j]["date"] = new Date(date_array[0] * 1000).toISOString();
        //     data[j]["ts_int"] = date_array[1];
        //     data[j]["channel"] = channel;
        //     data[j]['text_processed'] = await slackUser(toHTML(data[j]['text']));
            
        //     fs.writeFileSync(pagePath + '.md', JSON.stringify(data[j]) + '\n');
        //     // console.log('Created file: ' + pagePath + '.md');
        // }
    }
    
};

const main = async () => {
    console.log('Building data-generated files...');
    await build()
    console.log('Done!')
};

main();