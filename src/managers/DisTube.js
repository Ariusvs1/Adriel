const { readdirSync, statSync } = require('fs')
const { join } = require('path')
module.exports = class DisTube {
    constructor(client) {
        this.client = client
    }
    load() {
            const folder = join(__dirname, '../distube/');
            const categories = readdirSync(folder).filter(f => statSync(join(folder, f)).isDirectory());
            for (const category of categories) {
                const events = readdirSync(join(folder, category)).filter(x => x.endsWith('.js'));
                for (const event of events) {
                    const eventFile = require(join(folder, category, event));
                    const eventClass = new eventFile(this.client);
                    this.client.distube.on(eventClass.name, (...args) => eventClass.run(...args));
                }
            }
    }
}