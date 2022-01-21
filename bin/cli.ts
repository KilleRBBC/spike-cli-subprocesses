#! /usr/bin/env node

/*

Pull in STDIN, capture lines and send them to a handler
handler processes commands, and returns a new prompt

? Split console output for command processing, and other process stdout

commands:
status
dive into another process
surface from a process

 */

const stdinLineHandler = (handlerFunc: Function) => {
  let buff = '';

  process.stdin
    .on('data', data => {
      buff += data;
      const lines = buff.split(/\r\n|\n/);
      buff = lines.pop();
      lines.forEach(line => handlerFunc(line));
    })
    .on('end', () => {
      if (buff.length > 0) handlerFunc(buff);
    });
}

const processCommand = (commandLine: string) => {
  const [command, ...args] = commandLine.split(" ")
  switch (command) {
    case "dive":
      write(`Diving into ${args[0]}`);
      break;
    case 'exit':
    case 'quit':
      process.stdin.pause();
      break;
    default:
      write(`Unknown command: '${command}'`)
  }
}

const write = (text: string, withPrompt = true) => {
  process.stdout.write(`${text}\n> `)
}

stdinLineHandler(processCommand);
write('Welcome to the multiprocessor')
// stdin.on('line', console.log);

// setTimeout(() => process.stdin.pause(), 1000)
