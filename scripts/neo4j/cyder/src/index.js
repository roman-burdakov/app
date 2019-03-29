const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const { Command, flags } = require('@oclif/command');

class CyderCommand extends Command {
  async run() {
    const {flags} = this.parse(CyderCommand);
    const name = flags.name || process.env.HELLO;
    this.log(`hello ${name} from ./src/index.js`);
  }
}

CyderCommand.description = `Describe the command here
...
Extra documentation goes here
`

CyderCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = CyderCommand
