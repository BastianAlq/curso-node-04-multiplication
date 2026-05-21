import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

const { b: base, l: limit, s: showTable } = yarg;


const outputPath = `outputs`;


let outputContent = `=================\n`;
outputContent += `tabla del ${base}\n`;
outputContent += `=================\n`;



showTable ? console.log(outputContent) : console.log("Not showing the output in console");

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputContent);
console.log("File created!!")


//gtrabar en archivo de salida path: outputs/tabla-5.txt



